import { createLogger, format, transports } from "winston";
const Logger = createLogger({
    level: "debug",
    format: format.simple(),
    transports: [new transports.Console()]
});

export { Logger };
