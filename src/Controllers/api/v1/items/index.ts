import { Request, Response, NextFunction } from "express";
import { Item } from "@entities/Item";
import { Logger } from "../../../../Utilities/Logger";

/**
 * @api {get} /api/v1/items
 * @apiName Get all items.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * @apiSuccess (200) {Object} [ {
 *       Id: string,
 *       AvailableFrom: timestamp,
 *       OriginalPrice": number,
 *       CurrentPrice": number,
 *       ProductName": string,
 *       Description": string,
 *       Images": [ ]
 *   } ]
 * @apiFail (500) {Object} { success: false }
 */
export async function ItemHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // tslint:disable
    // @ts-ignore
    Logger.info(req["session"]["id"]);
    let items: Item[] = new Array<Item>();
    try {
        items = await Item.find();
    } catch (error) {
        return res.status(500).json({ success: false });
    }
    await res.json(items);
}
