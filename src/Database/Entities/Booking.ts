import {
    BaseEntity,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";
import { User } from "./User";
@Entity()
export class Booking extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public Id: string;

    @ManyToOne((type) => User, (user) => user.Bookings)
    public User: User;

    @Column()
    public Type: "entry" | "seat";

    @Column()
    public price: number;

    @Column()
    public SeatId: string;

    @Column()
    public Paid: boolean;
}
