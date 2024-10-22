import 'dotenv/config';
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import UserController from './controllers/UserController.ts';
import { parse } from 'node:url';

const PORT = process.env.PORT || 4000;

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;
  const parsedUrl = parse(url || '', true);
  const userId = parsedUrl.pathname?.split('/')[3];
  if (method === 'POST' && parsedUrl.pathname === '/api/users') {
    await UserController.create(req, res);
  }
  if (method === 'GET' && parsedUrl.pathname === '/api/users' && !userId) {
    await UserController.getAll(req, res);
  }
  if (method === 'GET' && parsedUrl.pathname === '/api/users' && userId) {
    await UserController.getOne(req, res);
  }
  if (method === 'PUT' && parsedUrl.pathname === '/api/users' && userId) {
    await UserController.update(req, res);
  }
  if (method === 'DELETE' && parsedUrl.pathname === '/api/users' && userId) {
    await UserController.delete(req, res);
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Page not found');
});

server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
