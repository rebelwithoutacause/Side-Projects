import http from 'k6/http';

export function login(username, password) {
  const res = http.post(
    'https://dummyjson.com/auth/login',
    JSON.stringify({ username, password }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  if (res.status !== 200) {
    return null;
  }

  return JSON.parse(res.body).accessToken;
}

export function authHeaders(token) {
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
}
