import { JwtPayload } from "jsonwebtoken";
import _ from "lodash";
import passport from "passport";
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import prisma from "src/common/database/prisma";
import { jwt } from "src/config";
const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwt.accessTokenSecret,
};

passport.use(
  new JWTStrategy(options, async (payload: JwtPayload, done) => {
    try {
      if (!payload.sub) return done(null, false);
      const user = await prisma.user.findUnique({
        where: { id: +payload.sub },
      });
      if (user && user.status) {
        const serializeUser = _.omit(user, ["password"]);

        return done(null, serializeUser);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }),
);

export default passport;
