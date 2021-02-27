const { Router } = require("express");
const passport = require("passport");
const FacebookStategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
const authService = require("../services/authService");
const jwt = require('jsonwebtoken');
const multipart = require('connect-multiparty');
const userService = require('../services/userService');
const Role = require('../models/role');
require("dotenv").config();

const multipartMiddleware = multipart();

const router = Router();
var loggedUser;



passport.use(
  new FacebookStategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/login/facebook/callback",
      profileFields: ["id", "displayName", "name", "email", "photos"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        var user = await User.findOne({ email: profile.emails[0].value });
      } catch {}
      if (!user) {
        let role = await Role.findOne({name: 'user'});
        const { email, name, first_name, last_name, picture } = profile._json;
      
        const userData = {
          username: email,
          firstName: first_name,
          lastName: last_name,
          email: email,
          isEmailVerified: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          createdBy: name,
          updatedBy: name,
          role: role,
          avatar: picture.data.url,
        };
        new User(userData).save();
        loggedUser = user;
      }
      return done(null, profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/login/google/callback",
      profileFields: ["id", "displayName", "name", "email", "photos"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        var user = await User.findOne({ email: profile.emails[0].value });
       
      } catch {}
      if (!user) {
        const {
          name,
          given_name,
          family_name,
          picture,
          email,
          email_verified,
        } = profile._json
        ;
        let role = await Role.findOne({name: 'user'});

        const userData = {
          username: email,
          email: email,
          isEmailVerified: email_verified,
          firstName: given_name,
          lastName: family_name,
          avatar: picture,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          createdBy: name,
          updatedBy: name,
          role: role,
        };

        new User(userData).save();
      }

      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

router.get(
  "/login/facebook",
  passport.authenticate("facebook", { scope: "email" })
);

router.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  async function(req, res) {
    // Successful authentication, redirect home.
    try {
      let user = await userService.getUserByEmail(req.user.emails[0].value);
      let token = jwt.sign(
        {_id: user._id, username: req.user.displayName, role: user.role.name, charities: user.charities.map(a => a.authorId), products: user.products.map(a => a.authorId), avatar: user.avatar},
        process.env.USER_SESSION_SECRET
    );
  
      res.cookie(process.env.COOKIE_SESSION_NAME, token);
    } catch(message) {
      console.log(message);
    }
    
    res.redirect('/');
  });

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/login/google/callback",
  passport.authenticate('google', { failureRedirect: '/login' }),
  async function(req, res) {
    try {
      
      let user = await userService.getUserByEmail(req.user.emails[0].value);
      let token = jwt.sign(
        {_id: user._id, username: req.user.displayName, role: user.role.name, charities: user.charities.map(a => a.authorId), products: user.products.map(a => a.authorId), avatar: user.avatar},
        process.env.USER_SESSION_SECRET
    );
  
      res.cookie(process.env.COOKIE_SESSION_NAME, token);
    } catch(message) {
      console.log(message);
    }
    res.redirect('/');
  }
);

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
    try {
        let token = await authService.login(req.body);

        res.cookie(process.env.COOKIE_SESSION_NAME, token);
        res.redirect('/');
    }catch (message) {
        res.render('auth/login', {message});
    }
});

router.get("/register", (req, res) => {
    res.render("auth/register");
  });
  
  router.post("/register", multipartMiddleware, async (req, res) => {
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if(password !== confirmPassword)
        {
            res.render('auth/register', {message: 'password missmatch'});
            return;
        }

      try {

          let filename = req.files.avatar.path;

          await authService.register(req.body, filename);
          
          res.redirect('login');
      }catch (message) {
          res.render('auth/register', {message});
      }
  });

  router.get('/emailverification/:token', async (req, res) => {
      try {
          await authService.emailVerification(req.params.token);
          res.render('user/verificationEmail');
      } catch(message) {
        console.log(message);
          res.render('auth/login', {message});
      }
  })
  
  router.get('/logout', async (req, res) => {
      await res.clearCookie(process.env.COOKIE_SESSION_NAME);

      res.redirect("/");
  })

  
module.exports = router;