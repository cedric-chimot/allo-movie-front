import { Categorie } from "../tables/Categorie";
import { Films } from "../tables/Films";

export class CategorieFilms {
  constructor(
    public id: number,
    public idCategorie: Categorie,
    public idFilm: Films,
  ) {}
}
