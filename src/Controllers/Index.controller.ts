import { Request, Response, NextFunction } from "express";
export async function IndexHandler(req: Request, res: Response) {
    res.render("index", {
        isAdmin: req.user ? req.user.AccessLevel === "admin" : false,
        isLoggedIn: req.user ? true : false
    });
}
