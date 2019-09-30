import { Configuration } from "@config";
import { Booking } from "@entities/Booking";
import { Logger } from "@utilities/Logger";
import { NextFunction, Request, Response } from "express";
import SeatsioClient from "seatsio";

const client = new SeatsioClient(Configuration.SeatsIO.PrivateKey);
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
    if (!req.user.EmailIsVerified) {
        return res.redirect("/auth/verify");
    }

    if ((await req.user.Bookings).length >= 2) {
        return next(new Error("Du kan inte boka fler än två platser."));
    }
    const seat = req.body.seat;
    const booking = new Booking();
    booking.Paid = false;
    booking.User = req.user;
    booking.SwishId = "";

    if (seat !== "") {
        // Book seat
        try {
            // If the user selected a seat, reserve it with the seatsio api. Also set the price to 90.
            await client.events.book(Configuration.SeatsIO.EventKey, [
                {
                    objectId: seat,
                    extraData: {
                        name: `${req.user.Name} ${req.user.Surname}`
                    }
                }
            ]);
        } catch (error) {
            Logger.error(JSON.stringify(error));
            return next(
                new Error(
                    "Kunde inte reservera din sittplats, den är säkert redan upptagen."
                )
            );
        }
        booking.SeatId = seat;
        booking.Type = "seat";
        booking.Price = 60;
    } else {
        // If the user didn't select a seat, change the type and set the price to 60.
        booking.SeatId = "";
        booking.Type = "entry";
        booking.Price = 30;
    }
    await booking.save();
    return res.redirect("/user/bookings");
}
