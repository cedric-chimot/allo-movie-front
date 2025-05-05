import { Acteurs } from "../tables/Acteurs";
import { Films } from "../tables/Films";

export class ActeursFilms {
  constructor(
    public id: number,
    public idFilm: Films,
    public idActeur: Acteurs,
    public role: string,
  ) {}
}
