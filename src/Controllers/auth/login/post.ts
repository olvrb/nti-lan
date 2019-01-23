import { Logger } from "@utilities/Logger";
import { NextFunction, Request, Response } from "express";
import passport from "passport";

/**
 * @api {post} /auth/login
 * @apiName Login.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * // TODO: update apiParams
 * @apiParam {string} [email] E-mail
 * @apiParam {string} [password] Password
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function LoginPostHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    Logger.info("inside post");

    passport.authenticate("local", (err, user, info) => {
        if (!user) {
            return res.redirect("/auth/login?loginError");
        }

        if (err) {
            return res.status(500).json({ error: "internal server error" });
        }
        req.login(user, (error) => {
            if (err) {
                return res.status(500).json({ error: "internal server error" });
            }
            process.nextTick(() => {
                return res.redirect("/book");
            });
        });
    })(req, res, next);
}
