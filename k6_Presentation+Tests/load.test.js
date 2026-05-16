import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 25 },
    { duration: '5m', target: 25 },
    { duration: '2m', target: 50 },
    { duration: '5m', target: 50 },
    { duration: '2m', target: 0  },
  ],
  thresholds: {
    http_req_failed:   ['rate<0.05'],
    http_req_duration: ['p(95)<1000', 'p(99)<2000'],
  },
};

export default function () {
  const loginRes = http.post(
    'https://dummyjson.com/auth/login',
    JSON.stringify({ username: 'emilys', password: 'emilyspass' }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(loginRes, {
    'login successful': (r) => r.status === 200,
  });

  const token = JSON.parse(loginRes.body).accessToken;

  const profileRes = http.get('https://dummyjson.com/auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  check(profileRes, {
    'profile fetched':   (r) => r.status === 200,
    'user data present': (r) => JSON.parse(r.body).id !== undefined,
  });

  sleep(1);
}
