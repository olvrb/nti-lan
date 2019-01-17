import { User } from "@entities/User";
import { Logger } from "@utilities/Logger";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export async function AuthMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, User.Authenticate)
    );
    passport.serializeUser((user: any, done) => {
        Logger.debug("Serializing user...");
        done(null, user.Id);
    });
    passport.deserializeUser(async (id, done) => {
        Logger.debug("Deserializing user...");
        done(null, await User.findOne({ where: { Id: id } }));
    });
    next();
}
