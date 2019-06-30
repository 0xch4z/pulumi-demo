import * as http from 'http';
import request = require('supertest');

import { app } from '../src/handler';

const useServer = async (): Promise<[http.Server, () => Promise<{}>]> => {
  const ls = await new Promise<http.Server>(resolve => {
    const srv = app.listen(0, () => resolve(srv));
  });

  const cleanUp = () =>
    new Promise((resolve, reject) => {
      ls.close(err => (err ? reject(err) : resolve()));
    });
  return [ls, cleanUp];
};

test('should greet user when name is specified', async () => {
  const [srv, cleanUp] = await useServer();
  try {
    const name = 'someone';
    return request(srv)
      .get(`/hello/${name}`)
      .expect(200, `Hello, ${name}!`);
  } finally {
    await cleanUp();
  }
});
