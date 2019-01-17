import { Logger } from "@utilities/Logger";
import { compareSync, hashSync } from "bcrypt";
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";

import { Booking } from "./Booking";

@Entity()
export class User extends BaseEntity {
    public static HashPassword(password: string) {
        return hashSync(password, 12);
    }
    public static async Authenticate(email: string, password: string, done) {
        const user = await User.findOne({
            where: { email }
        });
        if (user === undefined) {
            return Logger.info("Login rejected.");
        }
        if (email === user.Email && compareSync(password, user.Password)) {
            Logger.debug("User authenticated.");
            return done(null, user);
        }
    }

    public static ValidateEmail(email: string) {
        return email.match(
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        )
            ? true
            : false;
    }

    public static ValidatePassword(password: string) {
        return password.length > 8;
    }

    public static ValidateNationalId(nationalId: string) {
        return nationalId.match(
            /^(19|20)?[0-9]{2}[- ]?((0[0-9])|(10|11|12))[- ]?(([0-2][0-9])|(3[0-1])|(([7-8][0-9])|(6[1-9])|(9[0-1])))[- ]?[0-9]{4}$/g
        )
            ? true
            : false;
    }

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

    @OneToMany((type) => Booking, (booking) => booking.User)
    public Bookings: Booking[];
}
