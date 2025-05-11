import { MotifsEnum } from "./MotifsEnum";
import { Reponses } from "./Reponses";
import { Users } from "./Users";

export class Signalements {
  constructor(
    public id: number,
    public motif: MotifsEnum,
    public dateSignalement: number,
    public message: string,
    public idUser: Users,
    public idReponse: Reponses,
  ) {}
}
