import { Entity, JoinTable, ManyToMany } from 'typeorm';
import { Genre } from '../../genres/entities/genre.entity';

@Entity()
export class Film {
  titulo: string;
  capa: string;
  cover: string;
  anoLancamento: Date;

  @ManyToMany(() => Genre, (genre) => genre.films)
  @JoinTable()
  genres: Genre[];
}
