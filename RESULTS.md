# K6 lab results

## Part 0
- Step 0.1, http_req_duration: 253.96ms\
- Step 0.2, requests, rate and p(95), and why the rate stays below 5: Made 80 requests at 3.78 req/s with p(95) of 276.27ms. The rate stays below 5 req/s because each iteration takes about 1.31s on average (HTTP request duration ~0.26s + sleep(1) of 1s). Since each VU needs more than 1 second per request, 5 VUs together generate less than 5 requests per second.\
- Step 0.6, exit code of the normal run and of the run with P95=300: Normal run exit code: 0, P95=300 run exit code: 99
\
- Step 0.7, rules that passed, p(95), p(99), exit code after your change: All rules passed initially (p(95)=379.29ms, p(99)=391.15ms). After changing threshold to p(95)<200, the test failed with p(95)=381.06ms and exit code 99.
\ 
- Step 0.8, what was wrong in the API and how checks caught it: The API requires exact case-sensitive string matching for exclusions (`Pepperoni` and `Knife`). Sending lowercase `pepperoni` and `knife` caused the exclusion filters to be ignored. Testing under load found this bug because QuickPizza generates pizzas randomly; a single manual request might luckily return a pizza without pepperoni or knife, whereas 75 requests under load quickly triggered the random logic and revealed the failures.

## Part A results
| Step | Test type | Users | Req/s | p(95) | Max | Failed | Checks |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A1 | Smoke | 1 | 0.51/s | 395.64 ms | 555.77 ms | 0.00% | 100.00% |
| A2 | Average load | 3 | 1.33/s | 358.24 ms | 633.35 ms | 0.00% | 100.00% |
| A3 | Stress | 5 | 2.14/s | 357.96 ms | 379.75 ms | 0.00% | 100.00% |
| A4 | Spike | 5 | 1.03/s | 373.56 ms | 389.22 ms | 0.00% | 100.00% |
| A5 | Soak | 2 | 0.99/s | 367.09 ms | 394.90 ms | 0.00% | 100.00% |

## Part B
1. Completed in the table above.
2. In Step 0.2, each virtual user executes a request and then pauses for `sleep(1)` (1 second). With a response time of around 300–350ms, one full iteration takes ~1.3 seconds per VU. Therefore, 5 VUs can only generate about $5 / 1.3 \approx 3.8$ requests per second, keeping the total rate below 5 req/s.
3. No, the response time did not grow from the average-load test ($p(95) = 358.24\text{ ms}$) to the stress test ($p(95) = 357.96\text{ ms}$). This indicates that 5 VUs is well within QuickPizza's operational envelope (capacity threshold), so the system comfortably handled the load without reaching a knee of the curve or queueing bottleneck.
4. Response time remained stable throughout the spike test ($p(95) = 373.56\text{ ms}$, Max = $389.22\text{ ms}$). It took 0 seconds to return to normal because the server absorbed the sudden 5 VU spike without experiencing performance degradation or resource exhaustion.
5. In the soak test, neither response time ($p(95) = 367.09\text{ ms}$) nor error rate ($0.00\%$) worsened over the 10-minute duration. A soak test running over several hours could reveal defects like memory leaks, database connection pool leaks, unclosed file descriptors, or disk storage exhaustion due to unmanaged logs.
6. Thresholds use $p(95)$ instead of the average because average masks latency spikes experienced by a minority of users. Average is heavily diluted by fast responses, whereas $p(95)$ guarantees that 95% of requests meet the target latency, accurately capturing the worst-case real-user experience.
7. Two reasons for different numbers in a local lab:
   - **Network Latency:** Internet routing introduces variable network latency and jitter compared to a low-latency Local Area Network (LAN).
   - **Shared Server Noise:** The public QuickPizza instance suffers from background noise (other concurrent internet users), whereas a dedicated lab instance has isolated CPU, RAM, and database resources.
8. Running high-volume stress or spike tests against unowned third-party infrastructure constitutes an illegal Denial of Service (DoS/DDoS) attack. It can cause server downtime, degrade service for real users, trigger security/cloud cost overruns for the owner, and lead to severe legal penalties.
9. **Vague Requirement:** "The YouTube video recommendation API should load fast for users."  
   **Testable Requirement:** "Under a steady load of 10 concurrent users, 95% of video recommendation requests must respond within 500ms, and the HTTP failure rate must remain below 1%."  
   **K6 Thresholds:**
   ```javascript
   export const options = {
     thresholds: {
       http_req_duration: ['p(95)<500'],
       http_req_failed: ['rate<0.01'],
     },
   };