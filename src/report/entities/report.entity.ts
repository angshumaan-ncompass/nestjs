import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {
@PrimaryGeneratedColumn()
id: number;

@Column()
price: number;

@Column()
make: string;

@Column()
model: string;

@Column()
year: number;

@Column()
mileage: number;

@Column('boolean',{default: false})
approved: boolean;

@ManyToOne(()=> User, user => user.reports)
user: User

}
