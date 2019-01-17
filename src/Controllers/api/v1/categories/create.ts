import { Request, Response, NextFunction } from "express";
import { Category } from "@entities/Category";
import { Logger } from "@utilities/Logger";

/**
 * @api {post} /api/v1/categories/create
 * @apiName Create new category.
 * @apiPermission admin
 * @apiGroup admin
 *
 * @apiParam {string} [name] Name
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function CreateCategoryHandler(req: Request, res: Response) {
    Logger.info(
        `req.isAuth(): ${req.isAuthenticated()}, req.user: ${req.user}`
    );
    if (!req.isAuthenticated()) {
        return res.status(403).json({ error: "Unauthorized access." });
    }
    const category = new Category();
    category.Name = req.body.name;
    try {
        await category.save();
    } catch {
        return res.status(500).json({ success: false });
    }
    return res.json({ success: true });
}
