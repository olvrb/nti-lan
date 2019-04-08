import { Booking } from "@entities/Booking";
import { NextFunction, Request, Response } from "express";

export async function BookingPaidPostHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Must be logged in and have the correct permissions to mark a booking as paid.
    if (!req.user) return res.redirect("/");
    if (req.user.AccessLevel !== "admin") return res.redirect("/");

    const booking = await Booking.findOne({ where: { Id: req.body.booking } });

    // Didn't find booking, show error.
    if (booking === undefined) return next(new Error("Ogiltig bokning."));

    booking.SwishId = req.body.reason;
    booking.Paid = true;

    await booking.save();

    console.log(booking);
    await booking.User.SendEmail(
        `Din bokning är nu <strong style="color: green">betald</strong>.`
    );
    return res.redirect("/admin/bookings");
}
