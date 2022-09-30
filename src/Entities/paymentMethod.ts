import {BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Reservation } from './reservation'
@Entity()
export class PaymentMethod extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    denomination:string
    @Column({
        default:true
    })
    paymentMethodStatus:boolean
    @OneToMany(() => Reservation, (reservation) => reservation.paymentMethod) // note: we will create author property in the Photo class below
    reservations: Reservation[]
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt:Date;
}