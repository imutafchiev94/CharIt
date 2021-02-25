const { Router } = require("express");
const passport = require("passport");
const FacebookStategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
const authService = require("../services/authService");
require("dotenv").config();

const router = Router();

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

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
        console.log(user);
      } catch {}
      if (!user) {
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
          isDeleted: false,
          avatar: picture.url,
        };
        new User(userData).save();
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
        console.log(profile);
      } catch {}
      if (!user) {
        const {
          name,
          given_name,
          family_name,
          picture,
          email,
          email_verified,
        } = profile._json;

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
          isDeleted: false,
        };

        new User(userData).save();
      }

      return done(null, profile);
    }
  )
);

router.get(
  "/login/facebook",
  passport.authenticate("facebook", { scope: "email" })
);

router.get(
  "/login/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/login/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get("/login", (req, res) => {
  res.render("auth/login");
});

module.exports = router;
