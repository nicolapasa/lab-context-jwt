const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const  isAuthenticated  = require("./../middlewares/isAuthenticated.js"); // <== IMPORT

router.post('/signup', (req, res, next) => {
  /* Get back the payload from your request, as it's a POST you can access req.body */
   const {email, password}= req.body
  /* Hash the password using bcryptjs */
  // Check the users collection if a user with the same email already exists
  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }
 
      // If the email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(20);
      const hashedPassword = bcrypt.hashSync(password, salt);
 
      // Create a new user in the database
      // We return a pending promise, which allows us to chain another `then` 
      return User.create({ email, password: hashedPassword });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { email, _id } = createdUser;
    
      // Create a new object that doesn't expose the password
      const user = { email, _id };
 
      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" })
    });
})

router.post('/login', async(req, res, next) => {
  /* Get back the payload from your request, as it's a POST you can access req.body */
  const {email, password}= req.body
  /* Try to get your user from the DB */
  const foundUser= await User.findOne({email})
  /* If your user exists, check if the password is correct */
console.log(foundUser)
 if(foundUser){
  console.log(foundUser.password)
  const passwordCorrect = bcrypt.compare(password, foundUser.password);
  if (passwordCorrect) {
    const authToken = jwt.sign(
      {
        expiresIn: '6h',
        user: foundUser, // Put yhe data of your user in there
      },
      process.env.TOKEN_SECRET,
      {
        algorithm: 'HS256',
      }
    )
  
    res.status(200).json({ authToken: authToken });
  }

 }
 else{
  res.status(400).json({ message: "User not found." });
 }
 
 
})

router.get('/verify', isAuthenticated, async(req, res) => {
  // You need to use the middleware there, if the request passes the middleware, it means your token is good
  console.log(req.payload)
    const currentUser = await User.findById(req.payload._id)
    // Send back the object with user data
    // previously set as the token payload

    res.status(200).json({message: 'Token is valid', currentUser})
})

module.exports = router
