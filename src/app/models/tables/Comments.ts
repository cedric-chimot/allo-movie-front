import { Films } from "./Films";
import { Users } from "./Users";

export class Comments {
  constructor(
    public id: number,
    public comment: string,
    public dateComment: number,
    public note: number,
    public idUser: Users,
    public idFilm: Films,
  ) {}
}
