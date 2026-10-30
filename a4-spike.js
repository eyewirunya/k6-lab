import { journey } from './journey.js';

export const options = {
  stages: [
    { duration: '30s', target: 1 },  // Start with 1 user for 30 seconds
    { duration: '5s', target: 5 },   // Jump to 5 users within 5 seconds
    { duration: '30s', target: 5 },  // Hold 5 users for 30 seconds
    { duration: '5s', target: 1 },   // Drop back to 1 user within 5 seconds
    { duration: '1m', target: 1 },   // Stay at 1 user for 1 minute
    { duration: '10s', target: 0 },  // 10 seconds of ramp down
  ],
  thresholds: {
    checks: ['rate>0.99'],
    http_req_failed: ['rate<0.01'],
    'http_req_duration{group:::home}': ['p(95)<1000'],
    'http_req_duration{group:::recommendation}': ['p(95)<1500'],
  },
};

export default function () {
  journey();
}