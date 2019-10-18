import { Configuration } from "@config";
import { Logger } from "@utilities/Logger";
import { compareSync, hashSync } from "bcrypt";
import Mailgun from "mailgun-js";
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
const mailgunClient = Mailgun({
    apiKey: Configuration.Mail.ApiKey,
    domain: Configuration.Mail.Domain
});

import { Request } from "express";
import { Booking } from "./Booking";

@Entity()
export class User extends BaseEntity {
    public static HashPassword(password: string) {
        return hashSync(password, 12);
    }

    // Used to auth a user through passport.
    public static async Authenticate(email: string, password: string, done) {
        const user = await User.findOne({
            where: { Email: email }
        });

        if (user === undefined) {
            done(null, false, { message: "invalid email or password" });
            return Logger.info("Login rejected.");
        }
        if (email === user.Email && compareSync(password, user.Password)) {
            Logger.debug("User authenticated.");
            return done(null, user);
        } else {
            done(null, false, { message: "invalid email or password" });
            return Logger.info("Invalid password");
        }
    }

    // Some email regex. Fuck regex.
    public static ValidateEmail(email: string) {
        return email.match(
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        )
            ? true
            : false;
    }

    public static ValidatePassword(password: string) {
        return password.length >= 8;
    }

    // YYMMDD-XXXX
    public static ValidateNationalId(nationalId: string) {
        return nationalId.match(
            /^(19|20)?[0-9]{2}[- ]?((0[0-9])|(10|11|12))[- ]?(([0-2][0-9])|(3[0-1])|(([7-8][0-9])|(6[1-9])|(9[0-1])))[- ]?[0-9]{4}$/g
        )
            ? true
            : false;
    }

    // Avoid regex at all cost.
    public static ValidatePhone(phone: string) {
        // Faster than regex.
        return phone.startsWith("07") && phone.length === 10;
    }

    public static ValidatePostcode(postcode: string) {
        return postcode.length === 5;
    }

    @PrimaryGeneratedColumn("uuid")
    public Id: string;

    @Column()
    public Email: string;

    @Column()
    public EmailIsVerified: boolean;

    @Column()
    public EmailVerificationToken: string;

    @Column()
    public Password: string;

    // Personnummer
    @Column()
    public NationalId: string;

    // Förnamn
    @Column()
    public Name: string;

    // Efternamn
    @Column()
    public Surname: string;

    @Column()
    public PhoneNumber: string;

    // Telefonnummer anhörig
    @Column()
    public AdultPhoneNumber: string;

    @Column()
    public Address: string;

    // Postnummer
    @Column()
    public Postcode: string;

    // Postort
    @Column()
    public City: string;

    @Column({ default: "" })
    public Class: string;

    // User can own multiple bookings.
    @OneToMany((type) => Booking, (booking) => booking.User, { lazy: true })
    public Bookings: Booking[];

    // Gotta give some fun names huh.
    // (Admin has more permissions, such as removing * any * booking etc. pleb is the default, and means a regular user with less permissions.)
    @Column()
    public AccessLevel: "admin" | "pleb";

    @Column({ default: () => `now()` })
    public CreatedAt: string;

    // Have a default email template for consistency.
    public async SendEmail(message: string) {
        return new Promise<{ id: string; message: string }>(
            (resolve, reject) => {
                mailgunClient.messages().send(
                    {
                        from: Configuration.Mail.From,
                        to: this.Email,
                        subject: Configuration.Web.Site.Title,
                        html: `${message}
                        <br/>
                        NTI LAN Stockholm`
                    },
                    (error, body) => {
                        if (error) return reject(error);
                        resolve(body);
                    }
                );
                return true;
            }
        );
    }

    public async SendVerificationEmail(req: Request) {
        if (this.EmailIsVerified) return new Error("Email already verified");
        return new Promise<{ id: string; message: string }>(
            (resolve, reject) => {
                this.SendEmail(
                    `Verifiera din email adress: ${req.protocol}://${
                    req.hostname
                    }/api/v1/email/verify?token=${this.EmailVerificationToken}`
                )
                    .then(resolve)
                    .catch(reject);
            }
        );
    }
}
