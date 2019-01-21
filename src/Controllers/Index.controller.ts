import { Request, Response, NextFunction } from "express";
import { Configuration } from "@config";
export async function IndexHandler(req: Request, res: Response) {
    res.render("redesign/index", {
        path: req.path,
        title: Configuration.Web.Site.Title,
        isAdmin: req.user ? req.user.AccessLevel === "admin" : false,
        isLoggedIn: req.user ? true : false
    });
}
