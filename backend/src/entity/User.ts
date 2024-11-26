import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { PasswordHistory } from "./PasswordHistory"

@Entity()
export class User { // Сущность-таблица User

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    nickname: string

    @Column({ type: 'varchar', length: 24, nullable: false })
    password: string

    @Column({unique: true})
    email: string

    @Column({default: false})
    isAdmin: boolean

    @Column({ type: 'timestamp', nullable: true })
    passwordChangedAt: Date;

    @OneToMany(() => PasswordHistory, (passwordHistory) => passwordHistory.user)
    passwordHistory: PasswordHistory[];

    isPasswordExpired(): boolean {
        const passwordLifeTimeInDays = 136
        if (!this.passwordChangedAt) {
            return false;  
        }

        const expirationDate = new Date(this.passwordChangedAt);
        expirationDate.setDate(expirationDate.getDate() + passwordLifeTimeInDays);

        return expirationDate < new Date();
    }

    daysUntilPasswordExpires(): number {
        const passwordLifeTimeInDays = 136
        if (!this.passwordChangedAt) {
            return Infinity
        }

        const expirationDate = new Date(this.passwordChangedAt);
        expirationDate.setDate(expirationDate.getDate() + passwordLifeTimeInDays);

        const currentDate = new Date();
        const timeDifference = expirationDate.getTime() - currentDate.getTime();

        return Math.floor(timeDifference / (1000 * 3600 * 24))
    }

}
