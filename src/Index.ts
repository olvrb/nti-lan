// tslint:disable-next-line
require("module-alias/register");
import express from "express";
import { json, urlencoded } from "body-parser";
import { join } from "path";
import { Configuration } from "@config";
import { connect } from "./Database/Index";
import { BindControllers } from "./Controllers/Index";
import { BindMiddleware } from "./Middleware/Index";
import passport = require("passport");
const app = express();

app.set("view engine", "ejs");
app.set("views", join(__dirname, "../views"));

const port = Configuration.Web.Port;
connect()
    .then(() => {
        // Routes
        BindMiddleware();
        BindControllers();
        app.listen(port, () => {
            console.log(`Listening on port ${port}: http://localhost:${port}`);
        });
    })
    .catch(console.error);
export { app };
