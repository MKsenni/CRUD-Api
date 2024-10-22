import UserService from '../services/UserService.ts';
import { IncomingMessage, ServerResponse } from 'node:http';
import { validate as isValidUUID } from 'uuid';

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
      const parsedBody = JSON.parse(body);
      const { username, age, hobbies } = parsedBody;
      if (!username || !age || !hobbies) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON data');
        return;
      }
      const newUser = this.service.create(age, hobbies, username);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
      return;
    });
  }

  async getAll(req: IncomingMessage, res: ServerResponse) {
    const allUsers = this.service.getAll();
    if (!allUsers) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Users not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(allUsers));
    return;
  }

  async getOne(req: IncomingMessage, res: ServerResponse) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const parsedBody = JSON.parse(body);
      if (!isValidUUID(parsedBody.id)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid id of user. Must be in UUID format');
        return;
      }
      const user = this.service.getOne(parsedBody.id);
      if (!user) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('User not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
      return;
    });
  }

  async update(req: IncomingMessage, res: ServerResponse) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const parsedBody = JSON.parse(body);
      if (!isValidUUID(parsedBody.id)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid id of user. Must be in UUID format');
        return;
      }
      try {
        const newUser = this.service.update(parsedBody);
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

  async delete(req: IncomingMessage, res: ServerResponse) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const parsedBody = JSON.parse(body);
      if (!isValidUUID(parsedBody.id)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid id of user. Must be in UUID format');
        return;
      }
      try {
        this.service.delete(parsedBody.id);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify('User deleted'));
        return;
      } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('User not found');
        return;
      }
    });
  }
}

export default new UserController(UserService);
