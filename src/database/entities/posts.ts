import { Users } from "./users";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Photos } from "./photos";
@Entity("posts")
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn("increment") id: number;
  @Column({ nullable: true }) quotes: string;
  @Column() userId: number;
  @ManyToOne(() => Users, (user) => user.posts) user: Users;
  @OneToMany(() => Photos, (photos) => photos.post, { cascade: true })
  photos: Photos[];
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updated_at: Date;
}
