import { app } from "../Index";
import { Logger } from "../Utilities/Logger";
import { LoginGetHandler } from "./auth/login/get";
import { LoginPostHandler } from "./auth/login/post";
import { LogoutGetHandler } from "./auth/logout/get";
import { SignupGetHandler } from "./auth/signup/get";
import { SignupPostHandler } from "./auth/signup/post";
import { BookGetHandler } from "./book/get";
import { BookPostHandler } from "./api/v1/bookings/book";
import { E404Handler } from "./error/404";
import { AdminBookingsGetHandler } from "./admin/bookings";
import { BookingRemovePostHandler } from "./api/v1/bookings/remove";
import { IndexHandler } from "./Index.controller";

export function BindControllers() {
    Logger.info("Binding controllers.");

    app.get("/", IndexHandler);

    app.get("/auth/login", LoginGetHandler);
    app.post("/auth/login", LoginPostHandler);

    app.get("/book", BookGetHandler);
    app.post("/api/v1/bookings/book", BookPostHandler);

    app.post("/auth/signup", SignupPostHandler);
    app.get("/auth/signup", SignupGetHandler);

    app.get("/auth/logout", LogoutGetHandler);

    app.get("/admin/bookings", AdminBookingsGetHandler);

    app.post("/api/v1/bookings/remove", BookingRemovePostHandler);

    app.use(E404Handler);
}
