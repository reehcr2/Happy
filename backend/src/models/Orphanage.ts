import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import Image from "./image";
@Entity("orphanages")
export default class Orphanage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: "float" })
latitude!: number;

@Column({ type: "float" })
longitude!: number;

  @Column()
  about!: string;

  @Column()
  instructions!: string;

  @Column()
  opening_hours!: string;

  @Column()
  open_on_weekends!: boolean;

  @OneToMany(() => Image, (image) => image.orphanage, { cascade: ["insert", "update"] })
  @JoinColumn({ name: "orphanage_id" })
  images!: Image[];
}
