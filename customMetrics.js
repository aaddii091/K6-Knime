import { check } from "k6";
import http from "k6/http";
import { Counter } from "k6/metrics";

export const options = {
  vus: 1,
  iteration: 1,
  thresholds: {
    http_req_duration: ["p(95)<155"],
    http_req_failed: ["rate<0.01"],
    my_counter: ["rate>1"],
  },
};

const myCounter = new Counter("my_counter");

export default function () {
  const res = http.get("https://test.k6.io");
  console.log(res);
  myCounter.add(1);
}
