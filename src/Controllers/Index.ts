import { app } from "../Index";
import { Logger } from "../Utilities/Logger";
import { LoginGetHandler } from "./auth/login/get";
import { LoginPostHandler } from "./auth/login/post";
import { LogoutGetHandler } from "./auth/logout/get";
import { SignupGetHandler } from "./auth/signup/get";
import { SignupPostHandler } from "./auth/signup/post";
import { BookGetHandler } from "./book/get";
import { BookPostHandler } from "./book/post";
import { E404Handler } from "./error/404";

export function BindControllers() {
    Logger.info("Binding controllers.");

    app.get("/", (req, res) => res.render("index"));

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
