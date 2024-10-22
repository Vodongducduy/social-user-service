import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BasicEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({name:"created_at" ,type: "timestamp", default: ()=> "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @UpdateDateColumn({name:"updated_at",type: "timestamp",  default: ()=> "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updatedAt: Date;

    @Column({name: "created_by",type:"varchar", length: 50, nullable: true})
    createdBy: string;

    @Column({name:"updated_by",type:"varchar", length: 50, nullable: true})
    udpatedBy: string;
}