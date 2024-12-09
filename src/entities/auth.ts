export class Auth {
  constructor(
    public name: string,
    public password: string
  ){}

  toString() {
    return `Name: ${this.name}, password: ${this.password}`;
  }
}
