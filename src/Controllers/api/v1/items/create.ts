import { Request, Response, NextFunction } from "express";
import { Item } from "@entities/Item";
import { Category } from "@entities/Category";

/**
 * @api {post} /api/v1/items/create
 * @apiName Create new item.
 * @apiPermission admin
 * @apiGroup admin
 *
 * @apiParam {unix timestamp} [availableFrom] Which date the item should be available from.
 * @apiParam {Category} [categoryName] Name of the category the item should belong to.
 * @apiParam {string} [description] Description of the item.
 * @apiParam {Array<string>} [images] Base64 array of images.
 * @apiParam {number} [originalPrice] Original price of the item.
 * @apiParam {number} [currentPrice] Current price of the item.
 * @apiParam {string} [productName] Displayname of the item.
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function CreateItemHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const category = await Category.findOne({
        where: { Name: req.body.categoryName }
    });
    if (!category) return res.status(400).end();
    const item = new Item();
    item.AvailableFrom = new Date(req.body.availableFrom);
    item.Category = category;
    item.Description = req.body.description;
    item.Images = req.body.images;
    item.OriginalPrice = req.body.originalPrice;
    item.CurrentPrice = req.body.currentPrice;
    item.ProductName = req.body.productName;
    try {
        await item.save();
    } catch (error) {
        return res.json({ success: false });
    }
    return res.json({ success: true });
}
