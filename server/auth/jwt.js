const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const db = require("../../models");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      db.User.findOne({ where: { email: email } }).then(user => {
        if (user === null) {
          return done(null, false, { messages: ["User not found"] });
        }
        console.log(password);
        bcrypt.compare(password, user.password, (err, isMatch) => {
          console.log(isMatch);
          if (isMatch && user.confirmation_date) {
            return done(null, user);
          } else if (user.confirmation_date === null) {
            console.log(user);
            return done(null, false, { messages: ["Need to confirm email"] });
          } else {
            return done(null, false, {
              messages: ["Email or password are incorrect"]
            });
          }
        });
      });
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.AUTH_TYPE,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token")
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        console.log("JWT error <------------------");
        done(error);
      }
    }
  )
);
