export class Films {
  constructor(
    public id: number,
    public titre: string,
    public dateSortie: Date,
    public synopsis: string,
    public image: string,
    public noteMoyenne: number) {}
}
