import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

class UserService {
  private users: IUser[] = [];

  create(age: number, hobbies: string[], username: string) {
    const newUser = {
      id: uuidv4(),
      age: age,
      hobbies: hobbies,
      username: username
    };
    this.users.push(newUser);
    return newUser;
  }

  getAll() {
    return this.users;
  }

  getOne(id: string) {
    return this.users.find(user => user.id === id);
  }

  update(user: IUser) {
    const { id, age, hobbies, username } = user;
    const foundUser = this.getOne(id);
    if (!foundUser) {
      throw new Error();
    }
    if (foundUser) {
      user.username = username;
      user.age = age;
      user.hobbies = hobbies;
    }
    return user;
  }

  delete(id: string) {
    const foundUser = this.getOne(id);
    if (!foundUser) {
      throw new Error();
    }
    if (foundUser) {
      this.users.splice(this.users.indexOf(foundUser), 1);
    }
  }
}

export default new UserService();
