import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Logger } from "@utilities/Logger";
import { Booking } from "@entities/Booking";
import SeatsioClient from "seatsio";
import { Configuration } from "@config";
/**
 * @api {post} /auth/login
 * @apiName Login.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * @apiParam booking
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function BookingPaidPostHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.user) return res.redirect("/");
    if (req.user.AccessLevel !== "admin") return res.redirect("/");

    const booking = await Booking.findOne({ where: { Id: req.body.booking } });

    if (booking === undefined) return res.json({ message: "invalid booking" });

    booking.SwishId = req.body.reason;
    booking.Paid = true;

    await booking.save();
    return res.redirect("/admin/bookings");
}
