import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Orphanage from "./Orphanage";

@Entity("images")
export default class Image {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Orphanage, (orphanage) => orphanage.images)
  @JoinColumn({ name: "orphanage_id" })
  orphanage!: Orphanage;

  @Column()
  path!: string;
}
