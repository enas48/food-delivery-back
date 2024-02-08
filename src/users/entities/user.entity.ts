import { Roles } from "src/utility/commen/user-roles.enum";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class UserEnity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
  @Column({ type: "enum", enum: Roles, array: true, default: [Roles.USER] })
  roles: Roles[];
}
