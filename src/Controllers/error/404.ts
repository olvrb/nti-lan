import { NextFunction, Request, Response } from "express";

export function E404Handler(req: Request, res: Response, next: NextFunction) {
    return next(new Error("Sidan kunde inte hittas."));
}
