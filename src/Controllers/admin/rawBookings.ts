import { Booking } from "@entities/Booking";
import { Request, Response } from "express";

export async function RawAdminBookingsGetHandler(req: Request, res: Response) {
    if (!req.user) return res.redirect("/");
    if (req.user.AccessLevel !== "admin") return res.redirect("/");
    else {
        const bookings = await Booking.find();

        // We don't mind passing the user's password, as these objects are only used server-side.
        res.json(bookings);
    }
}
