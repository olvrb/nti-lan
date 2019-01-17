import { Request, Response } from "express";

export function E404Handler(req: Request, res: Response) {
    return res.status(404).send(`<a href="/">404, you're lost</a>`);
}
