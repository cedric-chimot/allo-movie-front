import { Films } from "../tables/Films";
import { Users } from "../tables/Users";

export class Favoris {
  constructor(
    public id: number,
    public idFilm: Films,
    public idUser: Users,
  ) {}
}
