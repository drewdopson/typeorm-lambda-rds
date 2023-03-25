import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "user"})
export default class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  phoneNumber: string;
}
