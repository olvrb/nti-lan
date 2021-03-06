import { Configuration } from "@config";
import { Request, Response } from "express";
export async function IndexHandler(req: Request, res: Response) {
    res.render("index", {
        path: req.path,
        title: Configuration.Web.Site.Title,
        isAdmin: req.user ? req.user.AccessLevel === "admin" : false,
        isLoggedIn: req.user ? true : false,
        games: Configuration.Web.Site.Tournaments,
        seatsio: {
            publicKey: Configuration.SeatsIO.PublicKey,
            eventKey: Configuration.SeatsIO.EventKey
        }
    });
}
