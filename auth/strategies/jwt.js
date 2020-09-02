import passport from "passport";
import passportJWT from "passport-jwt";

import { getUserById } from "../../routes/user.js";
import { signToken } from "../utils.js";

const JWTStrategy = passportJWT.Strategy;

const strategy = () => {
  const strategyOptions = {
    jwtFromRequest: (req) => req.cookies.jwt,
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true,
  };

  const verifyCallback = async (req, jwtPayload, cb) => {
    try {
      let user = await getUserById(jwtPayload.data._id);
      req.user = user;
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  };

  passport.use(new JWTStrategy(strategyOptions, verifyCallback));
};

const login = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, { session: false }, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve(signToken(user));
    });
  });
};

export { strategy, login };
