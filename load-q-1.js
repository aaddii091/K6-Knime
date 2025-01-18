/*
*
*
Using the POST /user/register/ endpoint, perform a load test with the following requirements:

Test Goal: Evaluate the endpoint's performance under a moderate and heavy load to ensure it can handle user registrations efficiently.

Load Testing Parameters:

Virtual Users (VUs): Start with 10 VUs and gradually ramp up to 100 VUs over 60 seconds.
Duration: Run the test for a total of 2 minutes.
Requests Per Second (RPS): Aim to simulate a realistic load by maintaining at least 50 requests per second.
Request Payload: Each registration request should include a JSON payload:

{
    "username": "test_user_<unique_id>",
    "password": "secure_password",
    "email": "test_user_<unique_id>@example.com"
}
Replace <unique_id> with a unique identifier for each request to simulate unique users.

Performance Metrics to Capture:

Response time (mean, p95, p99).
Request success rate (percentage of successful registrations).
Error rate (percentage of failed requests).
Throughput (requests per second).
*
*/

import http from "k6/http";
import { check } from "k6";

export const options = {
  stages: [
    {
      duration: "30s",
      target: 10,
    },
    {
      duration: "60s",
      target: 100,
    },
    {
      duration: "30s",
      target: 10,
    },
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"],
    "http_req_duration{status:201}": ["p(95)<2000"],
    "http_req_duration{status:201}": ["p(99)<2500"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  const credentials = {
    username: `test_username_${Date.now()}`,
    email: `${Date.now()}@gmail.com`,
    password: `${Date.now()}`,
    first_name: `test_first_name_${Date.now()}`,
    last_name: `test_last_name_${Date.now()}`,
  };
  let res = http.post(
    "https://test-api.k6.io/user/register/",
    JSON.stringify(credentials),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
