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
  releaseYear: number;

  @Column({ type: 'real' })
  imdb: number;

  @ManyToMany(() => Genre, (genre) => genre.films, { cascade: true })
  @JoinTable()
  genres: Genre[];
}
