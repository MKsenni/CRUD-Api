import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

class UserService {
  private users: IUser[] = [];

  create(body: Omit<IUser, 'id'>) {
    const { username, age, hobbies } = body;
    if (!username || !age || !hobbies) {
      throw new Error();
    }
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
    const foundUsers = this.users;
    if (!foundUsers.length) {
      throw new Error();
    }
    return foundUsers;
  }

  getOne(id: string) {
    const foundUser = this.users.find(user => user.id === id);
    if (!foundUser) {
      throw new Error();
    }
    return foundUser;
  }

  update(user: Omit<IUser, 'id'>, userId: string) {
    const foundUser = this.users.find(user => user.id === userId);
    if (foundUser) {
      this.users = this.users.map(currentUser => {
        if (currentUser.id === userId) {
          return { ...user, id: userId };
        }
        return currentUser;
      });
      return user;
    } else {
      this.create(user);
    }
  }

  delete(id: string) {
    const foundUser = this.getOne(id);
    if (foundUser) {
      this.users.splice(this.users.indexOf(foundUser), 1);
    }
  }
}

export default new UserService();
