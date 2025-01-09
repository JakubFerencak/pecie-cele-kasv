  import { Group } from "./group";

export class User {
  public static clone(user: User): User {
    return new User(user.name,
                    user.email,
                    user.id,
                    user.active === undefined ? true : user.active,
                    user.groups?.map(group => Group.clone(group)),
                    user.lastLogin,
                    user.password);
  }

  constructor(
    public name: string,
    public email: string,
    public id?: number,
    public active = true,
    public groups: Group[] = [],
    public lastLogin?: Date,
    public password = ''
  ){}

  toString(): string {
    return "name: " + this.name + ", email:" + this.email;
  }
}
