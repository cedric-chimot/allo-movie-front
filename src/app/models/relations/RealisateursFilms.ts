import { Films } from "../tables/Films";
import { Realisateurs } from "../tables/Realisateurs";

export class RealisateursFilms {
  constructor(
    public id: number,
    public idFilm: Films,
    public idRealisateur: Realisateurs,
  ) {}
}
