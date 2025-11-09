import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    googleId: string

    @Column({unique: true})
    username: string

    @Column({unique: true})
    email: string

    @Column()
    profilePicture: string

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date
}