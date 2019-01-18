import { Request, Response, NextFunction } from "express";
import { Category } from "@entities/Category";
import passport = require("passport");
import { User } from "@entities/User";
import { Configuration } from "@config";
import { Logger } from "@utilities/Logger";

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
    if (!req.user) return res.redirect("/");
    else {
        res.render("book", {
            seatsio: {
                publicKey: Configuration.SeatsIO.PublicKey,
                eventKey: Configuration.SeatsIO.EventKey
            },
            title: Configuration.Web.Site.Title,
            user: { name: req.user.Name, surname: req.user.Surname }
        });
    }
}
