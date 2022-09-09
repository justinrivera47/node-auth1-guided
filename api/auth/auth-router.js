const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../users/users-model')

router.post('/register', async (req,res,next) => {
  try {
    const { username, password } = req.body
    const hash = bcrypt.hashSync(password, 12)
    const newUser = { username, password: hash}
    const result = await User.add(newUser)
    res.status(201).json({ 
      message: `Nice to have you, ${result.username}`
    })
} catch(err) {
  next(err)
}
})
router.post('/login', async (req,res,next) => {
  try {
    const { username,  password } = req.body
    const [user] = await User.findBy({ username })
    if (user && bcrypt.compareSync(password, user.password)){
      req.session.user = user
      res.json({ message: `Welcome back, ${user.username}`})
    } else {
      next({ status: 401, message: 'Invalid username or password'})
    }
  } catch (error) {
    next(error)
  }
})
router.get('/logout', (req,res,next) => {
  if(req.session.user) {
    const { username } = req.session.user
    req.session.destroy(err => {
      if(err) {
        res.json({ message: `you could never leave, ${username}`})
      } else {
        res.set('Set-Cookie', 'monkey=; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00')
        res.json({ message: `Goodbye, ${username}` })
      }
    })
  } else {
    res.json({ message: 'sorry, have we met?'})
  }
})

module.exports = router