import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Reservation } from './reservation';
import { ReservationRoomDays } from './reservationRoomDays';
import { Room } from './room';
@Entity()
export class ReservationRoom extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    checkIn: string;
    @Column()
    checkOut: string;
    @Column({default:0})
    partialPrice:number
    @Column({
        default:true
    })
    status:boolean
    @Column({default:0})
    numberOfNights:number
    @ManyToOne(() => Reservation, (reservation) => reservation.reservations)
    reservation: Reservation
    @ManyToOne(() => Room, (room) => room.reservations)
    room: Room
    @OneToMany(() => ReservationRoomDays, (reservationroomday) => reservationroomday.reservationRoom) // note: we will create author property in the Photo class below
    reservationRoomDays: ReservationRoomDays[]
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt:Date;
}