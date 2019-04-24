export class Language {
  public id: number;
  public name: string;
  public isoCode: string;

  constructor(id: number, name: string, isoCode: string) {
    this.id = id;
    this.name = name;
    this.isoCode = isoCode;
  }
}
