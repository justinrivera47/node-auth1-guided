const express = require('express');

const router = express.Router();

router.post('/register', (req,res,next) => {
    res.json({ message: ' register working'})
})
router.post('/login', (req,res,next) => {
    res.json({ message: 'login working'})
})
router.get('/logout', (req,res,next) => {
    res.json({ message: 'logout working'})
})

module.exports = router