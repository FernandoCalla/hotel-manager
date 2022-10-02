import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Client } from './client'
import { Invoice } from './invoice'
import { PaymentMethod } from './paymentMethod'
import { ReservationRoom } from './reservationRoom'
@Entity()
export class Reservation extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number
    @Column({
        default:0
    }) 
    state:number // consider type number because a reservation has 3 status, 0 to Pendiente, 1 to Pagado and 2 to Eliminado.
    @Column({type: "float",default:0})
    totalPrice:number
    @ManyToOne(() => Client, (client) => client.reservations)
    client: Client
    @ManyToOne(() => PaymentMethod, (PaymentMethod) => PaymentMethod.reservations)
    paymentMethod: PaymentMethod
    @OneToMany(() => ReservationRoom, (reservationroom) => reservationroom.reservation) // note: we will create author property in the Photo class below
    reservations: ReservationRoom[]
    @OneToOne(() => Invoice, (invoice) => invoice.reservation)
    invoice: Invoice
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt:Date;
}