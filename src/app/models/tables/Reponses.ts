import { Comments } from "./Comments";
import { Users } from "./Users";

export class Reponses {
  constructor(
    public id: number,
    public dateReponse: number,
    public message: string,
    public idReponseEnfant: Reponses,
    public idUser: Users,
    public idComment: Comments,
  ) {}
}
