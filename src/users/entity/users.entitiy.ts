import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('users')
@Unique(['googleId', 'username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    googleId: number

    @Column()
    username: string

    @Column()
    profilePicture: string

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date
}