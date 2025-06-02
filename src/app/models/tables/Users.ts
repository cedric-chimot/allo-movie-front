import { Role } from "./Role";

export class Users {
  constructor(
    public id: number,
    public pseudo: string,
    public email: string,
    public mdp: string,
    public role: Role | null,
    public avertissements: number,
    public dateBan: number,
    public estBanni: boolean
  ) {}
}
