import {
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    Entity,
    ManyToOne
} from "typeorm";
import { Category } from "./Category";
@Entity()
export class Item extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public Id: string;

    @Column()
    public AvailableFrom: Date;

    // Original price, used to calculate discounts.
    @Column()
    public OriginalPrice: number;

    // Current price, uses the original price to calculate discount.
    @Column()
    public CurrentPrice: number;

    @Column()
    public ProductName: string;

    // Short, one-line description.
    @Column()
    public Description: string;

    // Base64 array of image blobs.
    @Column("simple-array")
    public Images: string[];

    @ManyToOne((type) => Category, (category) => category.Items)
    public Category: Category;
}
