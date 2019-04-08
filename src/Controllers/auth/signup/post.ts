import { User } from "@entities/User";
import { Logger } from "@utilities/Logger";
import { randomBytes } from "crypto";
import { NextFunction, Request, Response } from "express";

/**
 * @api {post} /auth/login
 * @apiName Login.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * // TODO: update apiParams
 * @apiParam {string} [name] Name
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function SignupPostHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Deconstruct the object... ES6 is great.
    const {
        email,
        password,
        nationalId,
        name,
        surname,
        phone,
        adultPhone,
        address,
        postcode,
        city
    } = req.body;

    // This is really ugly, but I'm too lazy to fix it. I could probably use the success template...
    if (!User.ValidateEmail(email)) {
        return res.status(400).send("ogiltig email");
    }
    if (!User.ValidatePassword(password)) {
        return res.status(400).send("ogiltigt lösenord (minst 8 tecken)");
    }
    if (!User.ValidateNationalId(nationalId)) {
        return res.status(400).send("ogiltigt personnummer (ÅÅMMDD-XXXX)");
    }
    if (!User.ValidatePhone(phone) && !User.ValidatePhone(adultPhone)) {
        return res
            .status(400)
            .send(
                "ogiltigt telefonnummer eller anhörig telefonnummer (ex. 0712345678)"
            );
    }
    if (!User.ValidatePostcode(postcode)) {
        return res.status(400).send("ogiltig postaddress (ex. 11266)");
    }
    const oldUser = await User.findOne({ where: { Email: email } });

    // User already exists? Let the client know.
    if (oldUser !== undefined) {
        return res.redirect("/auth/signup?invalidForm");
    }

    const user = new User();
    user.Email = email;
    user.Password = User.HashPassword(password);
    user.NationalId = nationalId;
    user.Name = name;
    user.Surname = surname;
    user.PhoneNumber = phone;
    user.AdultPhoneNumber = adultPhone;
    user.Address = address;
    user.Postcode = postcode;
    user.City = city;
    user.Bookings = [];
    user.AccessLevel = "pleb";
    user.EmailIsVerified = false;
    // Generate a random verification token. randomBytes is cryptographically secure: https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
    user.EmailVerificationToken = randomBytes(48).toString("hex");

    try {
        await user.save();
    } catch (error) {
        Logger.error(JSON.stringify(error));
        return res.status(500).send("internal server error, please try again");
    }

    // Let the user verify their email.
    user.SendVerificationEmail(req)
        .then((x) => res.redirect("/book"))
        .catch((err) => {
            Logger.error(err);
            res.redirect("/book");
        });
}
