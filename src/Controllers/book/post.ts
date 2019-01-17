import { Request, Response, NextFunction } from "express";
import { Category } from "@entities/Category";
import passport = require("passport");
import { User } from "@entities/User";
import { Configuration } from "@config";
import { Logger } from "@utilities/Logger";
import SeatsioClient from "seatsio";
import { Booking } from "@entities/Booking";
const client = new SeatsioClient("8f488fd1-39af-43b3-b028-339176a614bd");
/**
 * @api {get} /auth/login
 * @apiName Login.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function BookPostHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.user) return res.redirect("/");
    const seat = req.body.seat;
    const referrer = req.body.referrer;
    if (seat) {
        // Book seat
        try {
            await client.events.book(Configuration.SeatsIO.EventKey, [
                {
                    objectId: seat,
                    extraData: {
                        name: `${req.user.Name} ${req.user.Surname}`
                    }
                }
            ]);
        } catch (error) {
            Logger.error(error);
            return res.status(500).send("failed to reserve seat");
        }
        const booking = new Booking();
        booking.Paid = false;
        booking.SeatId = seat;
        booking.Type = "seat";
        booking.User = req.user;
    } else {
        // TODO: write this, save user
        // Don't book seat
    }
}
