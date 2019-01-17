import {
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    Entity,
    OneToMany
} from "typeorm";
import { Item } from "./Item";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    public Id: string;

    @OneToMany((type) => Item, (item) => item.Category)
    public Items: Item[];

    @Column()
    public Name: string;
}
