import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  // A number specifying the number of VUs to run concurrently.
  // 가상의 유저가 50명이라고 가정
  vus: 50,
  // A string specifying the total duration of the test run.
  // 테스트 시간
  duration: "1m",
  // thresholds: {
  //   http_req_duration: ["p(95)<500"],
  // },
  // The following section contains configuration options for execution of this
  // test script in Grafana Cloud.
  //
  // See https://grafana.com/docs/grafana-cloud/k6/get-started/run-cloud-tests-from-the-cli/
  // to learn about authoring and running k6 test scripts in Grafana k6 Cloud.
  //
  // cloud: {
  //   // The ID of the project to which the test is assigned in the k6 Cloud UI.
  //   // By default tests are executed in default project.
  //   projectID: "",
  //   // The name of the test in the k6 Cloud UI.
  //   // Test runs with the same name will be grouped.
  //   name: "script.js"
  // },

  // Uncomment this section to enable the use of Browser API in your tests.
  //
  // See https://grafana.com/docs/k6/latest/using-k6-browser/running-browser-tests/ to learn more
  // about using Browser API in your test scripts.
  //
  // scenarios: {
  //   // The scenario name appears in the result summary, tags, and so on.
  //   // You can give the scenario any name, as long as each name in the script is unique.
  //   ui: {
  //     // Executor is a mandatory parameter for browser-based tests.
  //     // Shared iterations in this case tells k6 to reuse VUs to execute iterations.
  //     //
  //     // See https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/ for other executor types.
  //     executor: 'shared-iterations',
  //     options: {
  //       browser: {
  //         // This is a mandatory parameter that instructs k6 to launch and
  //         // connect to a chromium-based browser, and use it to run UI-based
  //         // tests.
  //         type: 'chromium',
  //       },
  //     },
  //   },
  // }
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function () {
  let headers = {
    // Accept: "application/json, text/plain, */*",
    // "Accept-Language": "en-US,en;q=0.9",
    Connection: "keep-alive",
    "Content-Type": "application/json",
    // DNT: "1", // Do Not Track
    Origin: "http://double-entry-book-keeping.com", // CORS 헤더
    // Referer: "http://double-entry-book-keeping.com/",
  };

  let loginRes = http.post(
    "http://api.double-entry-book-keeping.com/auth/signin",
    JSON.stringify({
      id: "user",
      password: "password",
    }),
    {
      headers,
    }
  );

  check(loginRes, {
    "로그인 성공": (r) => r.status === 200,
  });

  let cookies = loginRes.cookies;
  let jwtCookie = cookies["jwt"];

  check(jwtCookie, {
    "JWT cookie is set": (c) => c && c.length > 0,
  });

  let createAccountRes = http.post(
    "http://api.double-entry-book-keeping.com/account",
    JSON.stringify({
      name: `account_${__VU}_${__ITER}`,
      // user 계정의 자산 계정과목 id
      parentId: "24560f3e-f127-4c28-86ff-49b9be257f9e",
    }),
    {
      headers,
    }
  );

  // 상태코드 및 응답 본문 출력
  // console.log("Status: " + createAccountRes.status);
  // console.log("Response body: " + createAccountRes.body);

  check(createAccountRes, {
    "계정과목을 성공적으로 생성하였다.": (r) => r.status === 201,
  });

  sleep(1);
}

// export function handleSummary(data) {
//   return {
//     stdout: JSON.stringify(data), // 콘솔로 요약 출력
//     "http://localhost:30090/api/v1/write": data, // Prometheus로 데이터 전송
//   };
// }
