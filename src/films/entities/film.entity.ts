import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Genre } from '../../genres/entities/genre.entity';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  cover: string;

  @Column()
  releaseYear: Date;

  @ManyToMany(() => Genre, (genre) => genre.films)
  @JoinTable()
  genres?: Genre[];
}
