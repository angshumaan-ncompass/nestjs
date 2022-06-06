import { Report } from "src/report/entities/report.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column('boolean', {default: false})
    isAdmin: boolean = false;

    @OneToMany(()=> Report, report => report.user)
    reports: Report[]

}
