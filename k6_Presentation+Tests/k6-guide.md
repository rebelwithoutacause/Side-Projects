# k6 Performance Testing Guide

## Table of Contents

1. [What is k6?](#what-is-k6)
2. [Installation](#installation)
3. [Test Sites with Dummy Data](#test-sites-with-dummy-data)
4. [Basic Test Structure](#basic-test-structure)
5. [Making HTTP Requests](#making-http-requests)
6. [Checks (Assertions)](#checks-assertions)
7. [Thresholds](#thresholds)
8. [Sleep](#sleep)
9. [Stages — Configuring Test Shape](#stages--configuring-test-shape)
10. [Chaining Requests](#chaining-requests)
11. [Test Types](#test-types)
    - [Smoke Test](#smoke-test)
    - [Load Test](#load-test)
    - [Stress Test](#stress-test)
    - [Spike Test](#spike-test)
12. [Running Tests](#running-tests)
13. [Reading Results](#reading-results)
14. [Writing Checklist](#writing-checklist)

---

## What is k6?

k6 is an open-source performance testing tool built for developers and QA engineers.
You write tests in JavaScript, run them from the terminal, and get detailed metrics
about how your API or service behaves under different levels of traffic.

**Use cases:**
- Verify an API works at all (smoke)
- Simulate normal daily traffic (load)
- Find the breaking point (stress)
- Test sudden traffic bursts (spike)

---

## Installation

```powershell
# Windows via winget
winget install k6 --source winget

# Verify installation
k6 version
```

---

## Test Sites with Dummy Data

These are free public APIs and pages you can safely test against:

| Site | Purpose | Credentials |
|------|---------|-------------|
| `https://dummyjson.com` | Full REST API with auth endpoint | `emilys` / `emilyspass` |
| `https://reqres.in` | Fake REST API | `eve.holt@reqres.in` / `cityslicka` |
| `https://jsonplaceholder.typicode.com` | Read-only fake REST API | No auth needed |
| `https://the-internet.herokuapp.com/login` | HTML login form for browser tests | `tomsmith` / `SuperSecretPassword!` |
| `https://fakestoreapi.com` | Fake e-commerce API | `mor_2314` / `83r5^_` |

**Best for k6 HTTP login testing:** `dummyjson.com` and `reqres.in` — they return JSON tokens
you can chain into follow-up authenticated requests.

---

## Basic Test Structure

Every k6 test file follows the same skeleton:

```javascript
import http from 'k6/http';        // makes HTTP requests
import { check, sleep } from 'k6'; // assertions and pausing

export const options = {
  // test configuration: VUs, duration, stages, thresholds
};

export default function () {
  // this function runs once per VU per iteration
  // your test logic goes here
}
```

**Key concepts:**
- `options` — tells k6 how many users, how long, and what counts as a pass/fail
- `default function` — the test loop; k6 calls this repeatedly for every virtual user

---

## Making HTTP Requests

### GET Request

```javascript
const res = http.get('https://dummyjson.com/users/1');
```

### POST Request with JSON Body

```javascript
const res = http.post(
  'https://dummyjson.com/auth/login',
  JSON.stringify({ username: 'emilys', password: 'emilyspass' }),
  { headers: { 'Content-Type': 'application/json' } }
);
```

### Authenticated Request

```javascript
const res = http.get('https://dummyjson.com/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

### Response Object Properties

| Property | What it contains |
|----------|-----------------|
| `res.status` | HTTP status code (200, 404, 500...) |
| `res.body` | Response body as a raw string |
| `res.json()` | Response body parsed as JSON object |
| `res.timings.duration` | Total request duration in milliseconds |
| `res.headers` | Response headers |

---

## Checks (Assertions)

Checks verify that your response is correct. They **do not stop the test** on failure —
they record pass/fail counts that appear in the final summary.

```javascript
import { check } from 'k6';

check(res, {
  'status is 200':    (r) => r.status === 200,
  'body not empty':   (r) => r.body.length > 0,
  'has token':        (r) => r.json().accessToken !== undefined,
  'fast response':    (r) => r.timings.duration < 500,
});
```

**Syntax:** `'label': (r) => boolean expression`
- Returns `true` → check passes
- Returns `false` → check fails

**Tips:**
- Use descriptive labels — they appear in the results output
- One check per thing you want to verify — don't combine conditions
- Always check `status` before checking the body (body may be empty on error)

---

## Thresholds

Thresholds define the pass/fail criteria for the **entire test**. If a threshold is
breached, k6 exits with a non-zero code (useful in CI pipelines).

```javascript
export const options = {
  thresholds: {
    // less than 1% of requests can fail
    http_req_failed: ['rate<0.01'],

    // 95% of requests must finish under 500ms
    // AND 99% must finish under 1000ms
    http_req_duration: ['p(95)<500', 'p(99)<1000'],

    // at least 95% of checks must pass
    checks: ['rate>0.95'],
  },
};
```

### Built-in Metrics for Thresholds

| Metric | Meaning |
|--------|---------|
| `http_req_failed` | Rate of failed requests (non-2xx or network error) |
| `http_req_duration` | Total request duration |
| `checks` | Rate of passed checks |
| `http_reqs` | Total number of requests |
| `iteration_duration` | How long one full iteration takes |

### Threshold Operators

| Operator | Example | Meaning |
|----------|---------|---------|
| `rate<X` | `rate<0.01` | Rate must be below X (use for errors) |
| `rate>X` | `rate>0.95` | Rate must be above X (use for checks passing) |
| `p(N)<X` | `p(95)<500` | Nth percentile must be below X ms |
| `avg<X` | `avg<200` | Average must be below X ms |
| `max<X` | `max<2000` | Maximum value must be below X ms |

---

## Sleep

`sleep()` pauses a virtual user between iterations. It simulates the time a real user
spends reading a page, filling a form, or thinking before the next action.

```javascript
import { sleep } from 'k6';

export default function () {
  http.get('https://dummyjson.com/users');
  sleep(1);          // fixed 1 second pause
}
```

**Random pause — more realistic:**

```javascript
sleep(Math.random() * 3); // random pause between 0 and 3 seconds
```

**Without sleep:** VUs loop as fast as possible, generating unrealistically high load
and hammering the server with no breathing room.

---

## Stages — Configuring Test Shape

Stages define how the number of virtual users changes over time. Each stage has:
- `duration` — how long this stage lasts
- `target` — the number of VUs at the **end** of this stage (k6 smoothly ramps between them)

```javascript
export const options = {
  stages: [
    { duration: '2m', target: 50 }, // ramp UP from 0 to 50 VUs over 2 minutes
    { duration: '5m', target: 50 }, // HOLD at 50 VUs for 5 minutes
    { duration: '2m', target: 0  }, // ramp DOWN to 0 over 2 minutes
  ],
};
```

**Visual representation:**

```
VUs
50 |          ___________
   |        /             \
   |      /                 \
 0 |____/                     \____
   0   2m        7m           9m    time
```

---

## Chaining Requests

Most real user flows involve multiple steps — login first, then use the token.

```javascript
export default function () {
  // Step 1: Login
  const loginRes = http.post(
    'https://dummyjson.com/auth/login',
    JSON.stringify({ username: 'emilys', password: 'emilyspass' }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(loginRes, { 'logged in': (r) => r.status === 200 });

  // Step 2: Extract token
  const token = loginRes.json().accessToken;

  sleep(1); // user pauses after logging in

  // Step 3: Use token in next request
  const profileRes = http.get('https://dummyjson.com/auth/me', {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  check(profileRes, { 'got profile': (r) => r.status === 200 });

  sleep(1);
}
```

**Pattern:** make request → check response → extract data → use data in next request.

---

## Test Types

### Smoke Test

**Goal:** Verify the system works at all. Catch obvious errors before running heavier tests.

**When to use:** Always run this first. If smoke fails, don't run other tests.

**Shape:** Minimum VUs, short duration.

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '30s',
  thresholds: {
    http_req_failed:   ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const res = http.post(
    'https://dummyjson.com/auth/login',
    JSON.stringify({ username: 'emilys', password: 'emilyspass' }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(res, {
    'status is 200':         (r) => r.status === 200,
    'has access token':      (r) => r.json().accessToken !== undefined,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
```

**Expected results:**
- 100% checks passed
- 0% errors
- Response times consistent and fast

---

### Load Test

**Goal:** Simulate normal daily traffic and peak traffic. Verify the system handles
expected user volumes without degrading.

**When to use:** After smoke passes. This is your baseline health check.

**Shape:** Ramp up → hold at normal load → ramp up to peak → hold → ramp down.

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 25 }, // ramp up to normal load
    { duration: '5m', target: 25 }, // hold normal load
    { duration: '2m', target: 50 }, // ramp up to peak
    { duration: '5m', target: 50 }, // hold peak load
    { duration: '2m', target: 0  }, // ramp down
  ],
  thresholds: {
    http_req_failed:   ['rate<0.05'],
    http_req_duration: ['p(95)<1000', 'p(99)<2000'],
  },
};

export default function () {
  // Step 1: Login
  const loginRes = http.post(
    'https://dummyjson.com/auth/login',
    JSON.stringify({ username: 'emilys', password: 'emilyspass' }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(loginRes, { 'login successful': (r) => r.status === 200 });

  const token = loginRes.json().accessToken;

  sleep(1);

  // Step 2: Authenticated request
  const profileRes = http.get('https://dummyjson.com/auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  check(profileRes, {
    'profile fetched':   (r) => r.status === 200,
    'user data present': (r) => r.json().id !== undefined,
  });

  sleep(1);
}
```

**What to watch:** Does response time stay stable as VUs increase? Does error rate stay near zero?

---

### Stress Test

**Goal:** Find the breaking point. Keep increasing load until the system starts failing,
then observe whether it recovers when load drops.

**When to use:** After load test passes. Run occasionally — not on every deploy.

**Shape:** Continuously increasing load, then recovery period at the end.

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 50  }, // warm up
    { duration: '5m', target: 100 }, // normal load
    { duration: '2m', target: 150 }, // above normal
    { duration: '5m', target: 200 }, // high load
    { duration: '2m', target: 250 }, // pushing limits
    { duration: '5m', target: 300 }, // maximum stress
    { duration: '5m', target: 0   }, // recovery
  ],
  thresholds: {
    http_req_failed:   ['rate<0.10'], // allow up to 10% errors under stress
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
    'not 429':    (r) => r.status !== 429, // rate limit
    'not 503':    (r) => r.status !== 503, // server overload
  });

  sleep(1);
}
```

**What to watch:**
- At which VU count do errors start appearing?
- Does the system recover during the ramp-down stage?
- Does it return 429 (rate limited) or 503 (crashed)?

---

### Spike Test

**Goal:** Test sudden, massive traffic surges — like a flash sale, a viral post, or
a scheduled event that sends all users in at once.

**When to use:** When your system may face sudden unpredictable bursts of traffic.

**Shape:** Low baseline → instant huge spike → hold → instant drop → recovery.

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m',  target: 5   }, // baseline
    { duration: '30s', target: 200 }, // instant spike
    { duration: '3m',  target: 200 }, // hold the spike
    { duration: '30s', target: 5   }, // instant drop
    { duration: '3m',  target: 5   }, // recovery
  ],
  thresholds: {
    http_req_failed:   ['rate<0.15'],   // allow more errors during spike
    http_req_duration: ['p(95)<5000'],  // looser time limit during spike
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
```

**What to watch:**
- Does the system survive the spike without crashing?
- How long does recovery take after traffic drops?
- Are there queued requests that complete late, or do they timeout?

---

## Running Tests

### Basic Commands

```powershell
k6 run smoke.test.js
k6 run load.test.js
k6 run stress.test.js
k6 run spike.test.js
```

### Override Options from CLI

```powershell
# Override VUs and duration
k6 run --vus 10 --duration 60s smoke.test.js

# Run exact number of iterations
k6 run --vus 5 --iterations 50 smoke.test.js
```

### Save Results to File

```powershell
# Create results folder
New-Item -ItemType Directory -Force results

# Save as JSON
k6 run --out json=results/smoke-results.json smoke.test.js

# Save as CSV
k6 run --out csv=results/load-results.csv load.test.js
```

### Useful Flags

| Flag | What it does |
|------|-------------|
| `--vus 20` | Override number of virtual users |
| `--duration 2m` | Override test duration |
| `--iterations 100` | Run exactly N iterations total |
| `--out json=file.json` | Save metrics to JSON |
| `--out csv=file.csv` | Save metrics to CSV |
| `--quiet` | Suppress progress bar, show only final summary |
| `--verbose` | Show detailed internal logs |
| `--http-debug` | Print full HTTP request and response details |
| `--no-color` | Plain text output (useful for CI logs) |

### Recommended Run Order

Always run in this order — each test builds confidence for the next:

```powershell
k6 run smoke.test.js   # 1. Does it work at all?
k6 run load.test.js    # 2. Does it handle normal traffic?
k6 run stress.test.js  # 3. Where does it break?
k6 run spike.test.js   # 4. Can it survive sudden bursts?
```

If smoke fails — stop and fix the issue before running the others.

---

## Reading Results

Example output after a run:

```
  █ THRESHOLDS

    http_req_duration
    ✓ 'p(95)<500' p(95)=312.29ms

    http_req_failed
    ✓ 'rate<0.01' rate=0.00%

  █ TOTAL RESULTS

    checks_total.......................: 75      2.4/s
    checks_succeeded...................: 100.00% 75 out of 75
    checks_failed......................: 0.00%   0 out of 75

    ✓ status is 200
    ✓ has access token
    ✓ response time < 500ms

    http_req_duration......: avg=237ms min=225ms med=228ms max=326ms p(90)=258ms p(95)=312ms
    http_req_failed........: 0.00%  0 out of 25
    http_reqs..............: 25     0.8/s
```

### Metric Explanations

| Metric | What it tells you |
|--------|------------------|
| `checks_succeeded` | How many of your assertions passed |
| `http_req_failed` | Percentage of requests that errored |
| `http_req_duration avg` | Average response time |
| `http_req_duration p(95)` | 95% of requests were faster than this |
| `http_req_duration max` | The single slowest request |
| `http_reqs/s` | Throughput — requests per second |
| `vus` | How many virtual users were active |
| `iterations` | Total number of test function executions |

### What Good Results Look Like

| Test | Error Rate | p(95) Duration |
|------|-----------|----------------|
| Smoke | 0% | < 500ms |
| Load | < 1% | < 1000ms |
| Stress | < 10% (at peak) | < 3000ms |
| Spike | < 15% (at spike) | < 5000ms |

---

## Writing Checklist

Use this every time you write a new test from scratch:

```
[ ] What URL am I testing?
[ ] What HTTP method? (GET / POST / PUT / DELETE)
[ ] Do I need headers? (Content-Type, Authorization)
[ ] Do I need a request body? (JSON.stringify it)
[ ] What does a successful response look like? → checks
[ ] What are my pass/fail limits? → thresholds
[ ] How many users and for how long? → vus/duration or stages
[ ] Do I need to chain multiple requests? → extract token/id between steps
[ ] Did I add sleep() to simulate real user pauses?
```

### Minimal Working Template — Start Here Every Time

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_failed:   ['rate<0.01'],
    http_req_duration: ['p(95)<1000'],
  },
};

export default function () {
  const res = http.get('https://dummyjson.com/products/1');

  check(res, {
    'status 200':       (r) => r.status === 200,
    'has product name': (r) => r.json().title !== undefined,
  });

  sleep(1);
}
```

Start with this, confirm it passes, then expand:
- Change the URL and method
- Add a POST body
- Add authentication
- Chain multiple requests
- Change `vus`/`duration` to stages for load/stress/spike shapes

---

## Test Type Summary

| Test | VUs | Duration | Thresholds | Goal |
|------|-----|----------|-----------|------|
| **Smoke** | 1 | 30s | Strict | Does it work at all? |
| **Load** | 25–50 | 15–20m | Moderate | Normal + peak traffic behavior |
| **Stress** | 50–300+ | 25–35m | Relaxed | Find the breaking point |
| **Spike** | 5 → 200 → 5 | 8–10m | Relaxed | Survive sudden traffic bursts |
