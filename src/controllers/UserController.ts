import UserService, { IUser } from '../services/UserService.ts';
import { IncomingMessage, ServerResponse } from 'node:http';

class UserController {
  private service: typeof UserService;

  constructor(service: typeof UserService) {
    this.service = service;
  }
  async create(req: IncomingMessage, res: ServerResponse) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const parsedBody: Omit<IUser, 'id'> = JSON.parse(body);
      try {
        const newUser = this.service.create(parsedBody);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
        return;
      } catch {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Have not required fields');
        return;
      }
    });
  }

  async getAll(req: IncomingMessage, res: ServerResponse) {
    try {
      const allUsers = this.service.getAll();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(allUsers));
      return;
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Users not found');
      return;
    }
  }

  async getOne(req: IncomingMessage, res: ServerResponse, userId: string) {
    try {
      const user = this.service.getOne(userId);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
      return;
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('User not found');
      return;
    }
  }

  async update(req: IncomingMessage, res: ServerResponse, userId: string) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const parsedBody = JSON.parse(body);
      if (!parsedBody.username || !parsedBody.age || !parsedBody.hobbies) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Have not required fields');
        return;
      }
      try {
        const newUser = this.service.update(parsedBody, userId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
        return;
      } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('User not found');
        return;
      }
    });
  }

  async delete(req: IncomingMessage, res: ServerResponse, userId: string) {
    try {
      this.service.delete(userId);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify('User deleted'));
      return;
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('User not found');
      return;
    }
  }
}

export default new UserController(UserService);
