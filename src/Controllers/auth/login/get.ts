import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Configuration } from "@config";

/**
 * @api {post} /auth/login
 * @apiName Login.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function LoginGetHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.user) {
        return res.redirect("/book");
    }
    res.render("login", { title: Configuration.Web.Site.Title });
}
