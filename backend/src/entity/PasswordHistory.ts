import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class PasswordHistory {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.passwordHistory, { onDelete: 'CASCADE' })
    user: User;

    @Column()
    password: string

    @Column({ type: 'timestamp', nullable: true })
    passwordChangedAt: Date;
}