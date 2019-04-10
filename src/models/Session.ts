export class Session {
  uid: string;
  date: Date;

  constructor(uid: string, date: Date) {
    this.uid = uid;
    this.date = date;
  }
}
