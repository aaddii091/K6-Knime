import { check } from "k6";
import http from "k6/http";

export const options = {
  vus: 1,
  duration: "10s",
  thresholds: {
    http_req_duration: ["p(95)<155"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  const res = http.get("https://test.k6.io");
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
  check(res, {
    "Page includes the details": (r) =>
      r.body.includes(
        "Collection of simple web-pages suitable for load testing."
      ) === true,
  });
}
