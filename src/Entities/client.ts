import {BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import {Reservation} from "./reservation"
@Entity()
export class Client extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number
    @Column({unique: true,})
    identityNumber:number//Campo que aceptara Numero de Cedula de Identidad, DNI (Peru) o numero de pasaporte
    @Column()
    firstname:string
    @Column()
    lastname:string
    @Column()
    email:string
    @Column()
    phonenumber:string
    @OneToMany(() => Reservation, (reservation) => reservation.client) // note: we will create author property in the Photo class below
    reservations: Reservation[]
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt:Date;
}