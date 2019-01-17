import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
@Entity()
export class Booking extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public Id: string;

    @ManyToOne((type) => User, (user) => user.Bookings)
    public User: User;
}
