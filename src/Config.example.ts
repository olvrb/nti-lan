import { ConnectionOptions } from "typeorm";
export class Configuration {
    public static Web = {
        Port: 3224 || process.env.PORT,
        SeatsIO: {
            PublicKey: "7958b1d7-e11e-4497-a922-ccef063a4429",
            EventKey: "143b876d-b0d9-436d-b90a-c8bbbd0b582f"
        },
        Site: {
            Title: "PåskLAN 2019"
        }
    };
    public static Database: ConnectionOptions = {
        type: "postgres",
        host: "localhost",
        port: 5432,
        database: "placeholder",
        synchronize: true,
        username: "postgres",
        password: "123"
    };
}
