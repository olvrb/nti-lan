import { Request, Response, NextFunction } from "express";
import { Logger } from "../../Utilities/Logger";
export async function LoggerMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    Logger.info(`${new Date()} ${req.method} request to ${req.path}.`);
    next();
}
