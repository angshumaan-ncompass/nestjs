import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity('report')
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.report)
    user: User;

    @Column()
    price: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column({ type: 'year' })
    year: Date;

    @Column()
    mileage: number;

    @Column()
    approved: boolean;
}