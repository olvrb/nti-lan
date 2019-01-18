import { Configuration } from "@config";
import { Session } from "@entities/Session";
import { json, urlencoded } from "body-parser";
import express from "express";
import session from "express-session";
import Swagger from "express-swagger";
import passport = require("passport");
import { join } from "path";
import { getConnection, Repository } from "typeorm";
import { SessionEntity, TypeormStore } from "typeorm-store";
import uuid from "uuid/v4";

import { app } from "../Index";
import { Logger } from "../Utilities/Logger";
import { AuthMiddleware } from "./Auth/Index";
import { LoggerMiddleware } from "./Logger/Index";

export function BindMiddleware() {
    Logger.info("Binding middleware.");

    app.use(LoggerMiddleware);
    app.use(
        session({
            genid: () => uuid(),
            secret: Configuration.Web.Secret,
            resave: true,
            store: new TypeormStore({
                // wtf typescript
                repository: (getConnection().getRepository(
                    Session
                ) as unknown) as Repository<SessionEntity>
            }),
            saveUninitialized: true,
            cookie: { httpOnly: false }
        })
    );
    app.use(json()); // for parsing application/json
    app.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(express.static(join(__dirname, "../../public")));
    app.use(AuthMiddleware);
    app.use(passport.initialize());
    app.use(passport.session());
}
