import { Logger } from "@utilities/Logger";
import { NextFunction, Request, Response } from "express";
export async function LoggerMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Fast logging woooooosh.
    Logger.info(
        `${new Date()} ${req.method} request to ${req.path} from ${req.ip}.`
    );
    next();
}
