import { app } from "../Index";
import { Logger } from "../Utilities/Logger";
import { CreateCategoryHandler } from "./api/v1/categories/create";
import { ItemHandler } from "./api/v1/items";
import { CreateItemHandler } from "./api/v1/items/create";
import { LoginPostHandler } from "./auth/login/post";
import { SignupPostHandler } from "./auth/signup/post";
import { E404Handler } from "./error/404";
import { BookGetHandler } from "./book/get";
import { LoginGetHandler } from "./auth/login/get";
import { SignupGetHandler } from "./auth/signup/get";
import { AuthMiddleware } from "Middleware/Auth/Index";
import { LogoutGetHandler } from "./auth/signout/get";
import { BookPostHandler } from "./book/post";

export function BindControllers() {
    Logger.info("Binding controllers.");

    app.get("/auth/login", LoginGetHandler);
    app.post("/auth/login", LoginPostHandler);

    app.get("/book", BookGetHandler);
    app.post("/book", BookPostHandler);

    app.post("/auth/signup", SignupPostHandler);
    app.get("/auth/signup", SignupGetHandler);

    app.get("/auth/logout", LogoutGetHandler);

    // app.get("/api/v1/items", ItemHandler);
    // app.post("/api/v1/items/create", CreateItemHandler);
    // app.post("/api/v1/categories/create", CreateCategoryHandler);

    app.use(E404Handler);
}
