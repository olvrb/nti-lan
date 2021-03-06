import { Configuration } from "@config";
import { Booking } from "@entities/Booking";
import { Logger } from "@utilities/Logger";
import { NextFunction, Request, Response } from "express";
import SeatsioClient from "seatsio";

const client = new SeatsioClient(Configuration.SeatsIO.PrivateKey);

export async function BookingRemovePostHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.user) return res.redirect("/");

    // If the user is an admin, it should be able to remove *any* booking.
    if (req.user.AccessLevel === "admin") {
        const booking = await Booking.findOne({
            where: { Id: req.body.booking }
        });

        if (booking === undefined) {
            return next(new Error("Ogiltig bokning."));
        }

        if (booking.Type === "seat") {
            try {
                await client.events.release(
                    Configuration.SeatsIO.EventKey,
                    booking.SeatId
                );
            } catch (e) {
                Logger.error(e);
            }
        }
        await booking.remove();
        return res.redirect("/admin/bookings");
    }
    // If the user isn't admin, it should only be able to remove *its own* bookings.
    else {
        const booking = await Booking.findOne({
            where: { User: req.user, Id: req.body.booking }
        });
        if (booking === undefined) {
            return next(new Error("Ogiltig bokning."));
        }
        if (booking.Type === "seat") {
            await client.events.release(
                Configuration.SeatsIO.EventKey,
                booking.SeatId
            );
        }

        await booking.remove();
        return res.redirect("/user/bookings");
    }
}
