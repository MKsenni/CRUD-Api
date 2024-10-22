import 'dotenv/config';
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import UserController from './controllers/UserController.ts';
import { parse } from 'node:url';
import { validate as isValidUUID } from 'uuid';

const PORT = process.env.PORT || 4000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;
  const parsedUrl = parse(url || '', true);
  const userId = parsedUrl.pathname?.split('/')[3];
  if (userId && !isValidUUID(userId)) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Invalid id of user. Must be in UUID format');
    return;
  }
  try {
    if (method === 'POST' && parsedUrl.pathname === '/api/users') {
      return UserController.create(req, res);
    }
    if (method === 'GET' && parsedUrl.pathname === '/api/users') {
      return UserController.getAll(req, res);
    }
    if (method === 'GET' && userId && parsedUrl.pathname === `/api/users/${userId}`) {
      return UserController.getOne(req, res, userId);
    }
    if (method === 'PUT' && userId && parsedUrl.pathname === `/api/users/${userId}`) {
      return UserController.update(req, res, userId);
    }
    if (method === 'DELETE' && userId && parsedUrl.pathname === `/api/users/${userId}`) {
      return UserController.delete(req, res, userId);
    }
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server Error');
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Page not found');
});

server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
