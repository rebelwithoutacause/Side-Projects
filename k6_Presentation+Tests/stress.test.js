import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 50  },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 150 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 250 },
    { duration: '5m', target: 300 },
    { duration: '5m', target: 0   },
  ],
  thresholds: {
    http_req_failed:   ['rate<0.10'],
    http_req_duration: ['p(95)<3000'],
  },
};

export default function () {
  const res = http.post(
    'https://dummyjson.com/auth/login',
    JSON.stringify({ username: 'emilys', password: 'emilyspass' }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(res, {
    'status 200': (r) => r.status === 200,
    'not 429':    (r) => r.status !== 429,
    'not 503':    (r) => r.status !== 503,
  });

  sleep(1);
}
