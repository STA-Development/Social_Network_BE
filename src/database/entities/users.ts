import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Posts } from "./posts";

@Entity("users")
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn("increment") id: number;
  @Column() first_name: string;
  @Column() last_name: string;
  @Column({ unique: true }) email: string;
  @Column() password: string;
  @Column({ nullable: true }) profileImage: string;
  @Column({ nullable: true }) coverImage: string;
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
  /*
  @OneToMany(() => Photos, (photo) => photo.user, { cascade: true })
  photos: Photos[];
   */
  @OneToMany(() => Posts, (quotes) => quotes.user, { cascade: true })
  posts: Posts[];
}
