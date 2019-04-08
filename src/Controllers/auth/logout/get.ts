import { NextFunction, Request, Response } from "express";

/**
 * @api {get} /auth/signout
 * @apiName Sign out.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function LogoutGetHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // KILL EVERYTHING
    if (req.user && req.session) {
        req.session.destroy((err) => err);
        req.logout();
        return res.redirect("/");
    }
}
