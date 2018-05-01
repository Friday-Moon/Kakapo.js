import { Server, Router } from '../src';

test.skip('Request # headers', (assert) => {
  assert.plan(2);

  const server = new Server();
  const router = new Router();

  router.post('/users', (request) => {
    assert.equal(request.headers.get('custom-request-header-1'), 'one',
      'Receives the first header');
    assert.equal(request.headers.get('custom-request-header-2'), 'two',
      'Receives the second header');
  });

  server.use(router);
  
  const headers = new Headers({
    'custom-request-header-1': 'one',
    'custom-request-header-2': 'two',
  });

  const options = {
    method: 'POST',
    headers,
  };

  fetch('/users', options);
});

// @TODO: Test explicitly the contents of request.params
// @TODO: Test explicitly the contents of request.query