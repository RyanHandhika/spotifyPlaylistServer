import { nanoid } from "nanoid";

class UserModel {
  constructor(name, email, password) {
    this.id = nanoid(12);
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

export default UserModel;
