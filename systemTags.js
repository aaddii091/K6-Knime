import { check } from "k6";
import http from "k6/http";
import { Counter } from "k6/metrics";

export const options = {
  vus: 1,
  iteration: 1,
  thresholds: {
    http_req_duration: ["p(95)<3000"],
    "http_req_duration{status:201}": ["p(95)<100"],
    "http_req_duration{status:200}": ["p(95)<1000"],
    http_req_failed: ["rate<0.01"],
    my_counter: ["rate<1"],
  },
};

const myCounter = new Counter("my_counter");

export default function () {
  let res = http.get("https://test.k6.io");
  console.log(res.status);

  res = http.get(
    "https://run.mocky.io/v3/c4c73a49-bce9-484b-8f2f-1ede351aa0bc?mocky-delay=2000ms"
  );

  check(res, {});
  myCounter.add(1);
}
