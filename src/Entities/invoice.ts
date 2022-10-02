import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Reservation } from './reservation';
import { ReservationRoom } from './reservationRoom'
@Entity()
export class Invoice extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number
    @Column({type: "float",default:0})
    totalPrice:number
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt:Date;
    @OneToOne(() => Reservation,(reservation) => reservation.invoice)
    @JoinColumn()
    reservation: Reservation
}