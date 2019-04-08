import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { SessionEntity } from "typeorm-store";

// Woosh inheritance
@Entity()
export class Session extends BaseEntity implements SessionEntity {
    @PrimaryColumn()
    public id: string;

    @Column()
    public expiresAt: number;

    @Column()
    public data: string;
}
