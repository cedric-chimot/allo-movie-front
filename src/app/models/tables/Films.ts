export class Films {

  constructor(
    public id: number | null,
    public titre: string,
    public dateSortie: number,
    public synopsis: string,
    public image: string,
    public noteMoyenne: number
  ) {}

}
