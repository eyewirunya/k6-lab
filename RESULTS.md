# K6 lab results

## Part 0
Step 0.1, http_req_duration: 253.96ms\
Step 0.2, requests, rate and p(95), and why the rate stays below 5: Made 80 requests at 3.78 req/s with p(95) of 276.27ms. The rate stays below 5 req/s because each iteration takes about 1.31s on average (HTTP request duration ~0.26s + sleep(1) of 1s). Since each VU needs more than 1 second per request, 5 VUs together generate less than 5 requests per second.\
Step 0.6, exit code of the normal run and of the run with P95=300: Normal run exit code: 0, P95=300 run exit code: 99
\
Step 0.7, rules that passed, p(95), p(99), exit code after your change: All rules passed initially (p(95)=379.29ms, p(99)=391.15ms). After changing threshold to p(95)<200, the test failed with p(95)=381.06ms and exit code 99.
\ 
Step 0.8, what was wrong in the API and how checks caught it: The API requires exact case-sensitive string matching for exclusions (`Pepperoni` and `Knife`). Sending lowercase `pepperoni` and `knife` caused the exclusion filters to be ignored. Testing under load found this bug because QuickPizza generates pizzas randomly; a single manual request might luckily return a pizza without pepperoni or knife, whereas 75 requests under load quickly triggered the random logic and revealed the failures.

## Part A results
| Step | Test type | Users | Req/s | p(95) | Max | Failed | Checks |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A1 | Smoke | 1 | | | | | |
| A2 | Average load | 3 | | | | | |
| A3 | Stress | 5 | | | | | |
| A4 | Spike | 5 | | | | | |
| A5 | Soak | 2 | | | | | |

## Part B
1. 
2. 
3. 
4. 
5. 
6. 
7. 
8. 
9. 