const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.js')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy({ 
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    // console.log(email , password)
  User
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: '這個 Email 還未被註冊 !'})
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Email 或 Password 錯誤.'})
      }
      return done(null, user)
    })
    .catch((err) => done(err, false))
  } 
))
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  }) 
}