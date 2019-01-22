import { Configuration } from "@config";
import { NextFunction, Request, Response } from "express";

/**
 * @api {get} /auth/login
 * @apiName Login.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function BookGetHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(req.user);

    if (!req.user) return res.redirect("/auth/login");
    else {
        res.render("book", {
            seatsio: {
                publicKey: Configuration.SeatsIO.PublicKey,
                eventKey: Configuration.SeatsIO.EventKey
            },
            path: req.path,
            isLoggedIn: true,
            title: Configuration.Web.Site.Title,
            user: { name: req.user.Name, surname: req.user.Surname },
            isAdmin: req.user.AccessLevel === "admin"
        });
    }
}
