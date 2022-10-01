import {BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ReservationRoom } from './reservationRoom'
@Entity()
export class Room extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    roomNumber:number
    @Column()
    roomPrice:number
    @Column()
    bedsNumber:number
    @Column()
    roomFloor:number
    @Column({default:true})
    privateBathroom:boolean
    @Column({default:true})
    state:boolean
    @OneToMany(() => ReservationRoom, (reservationroom) => reservationroom.reservation) // note: we will create author property in the Photo class below
    reservations: ReservationRoom[]
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt:Date;
}