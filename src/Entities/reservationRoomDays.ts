import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Reservation } from './reservation';
import { ReservationRoom } from './reservationRoom';
import { Room } from './room';
@Entity()
export class ReservationRoomDays extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    day: Date;
    @Column()
    partialPriceDay:number
    @ManyToOne(() => ReservationRoom, (reservationroom) => reservationroom.reservationRoomDays)
    reservationRoom: ReservationRoom
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt:Date;
}