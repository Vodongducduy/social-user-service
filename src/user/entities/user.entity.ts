import { BasicEntity } from "src/common/basic.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("users")
export class UserEntity extends BasicEntity{

    @Column({type: "varchar"})
    name: string;

    @Column({type: "varchar", length: 30, nullable: true})
    username: string;

    @Column({type: "varchar" , length: 15, default: "anonymous"})
    role: string;

    @Column({type: "varchar", length: 40})
    email: string;

    @Column({ type: 'varchar'})
    password: string;

    @Column({type: "varchar", nullable: true })
    refreshToken: string;

}