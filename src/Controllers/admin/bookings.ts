import { Request, Response, NextFunction } from "express";
import { Category } from "@entities/Category";
import passport = require("passport");
import { User } from "@entities/User";
import { Configuration } from "@config";
import { Logger } from "@utilities/Logger";
import { Booking } from "@entities/Booking";

/**
 * @api {get} /auth/login
 * @apiName Login.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function AdminBookingsGetHandler(req: Request, res: Response) {
    if (!req.user) return res.redirect("/");
    if (req.user.AccessLevel !== "admin") return res.redirect("/");
    else {
        const bookings = await Booking.find();

        // We don't mind passing the user's password, as these objects are only used server-side.
        res.render("admin/bookings", {
            title: Configuration.Web.Site.Title,
            user: { name: req.user.Name, surname: req.user.Surname },
            bookings
        });
    }
}
