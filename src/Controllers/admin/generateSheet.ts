import { Booking } from "@entities/Booking";
import { Request, Response } from "express";


export async function AdminGenerateSheetsGetHandler(req: Request, res: Response) {
    if (!req.user) return res.redirect("/");
    if (req.user.AccessLevel !== "admin") return res.redirect("/");
    else {
        const bookings = sanitizeBookings(await Booking.find());
        const formattedCsvData = bookings.map(x => `${x.User.Name}, ${x.User.Surname}, ${x.SeatId}, ${x.Paid}`);


        const csv = `Name, Surname, SeatId, Paid\n${formattedCsvData.join("\n")}`;
        res.setHeader('Content-disposition', 'attachment; filename=result.csv');
        res.setHeader('Content-type', 'text/csv');

        res.write(csv, res.end);
    }
}


function sanitizeBookings(bookings: Booking[]) {
    for (const booking of bookings) {
        delete booking.User.Password;
        delete booking.User.NationalId;
        delete booking.User.EmailVerificationToken;
    }
    return bookings;
}