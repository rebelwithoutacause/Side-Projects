import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m',  target: 5   },
    { duration: '30s', target: 200 },
    { duration: '3m',  target: 200 },
    { duration: '30s', target: 5   },
    { duration: '3m',  target: 5   },
  ],
  thresholds: {
    http_req_failed:   ['rate<0.15'],
    http_req_duration: ['p(95)<5000'],
  },
};

export default function () {
  const res = http.post(
    'https://dummyjson.com/auth/login',
    JSON.stringify({ username: 'emilys', password: 'emilyspass' }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(res, {
    'login responded':  (r) => r.status !== 0,
    'not server error': (r) => r.status < 500,
  });

  sleep(1);
}
