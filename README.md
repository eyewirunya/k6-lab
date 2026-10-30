# k6-lab
# ITCS386 Software Verification and Validation
## Lab: Performance Testing with Grafana K6

**Student Name:** Wirunya Kaewthong  
**Student ID:** 6688172  

---

## 📌 Overview
This repository contains performance testing scripts, execution HTML reports, and reflection documentation for testing the QuickPizza API (`https://quickpizza.grafana.com`) using **Grafana K6**.

---

## 📁 Repository Structure

```text
k6-lab/
├── README.md
├── RESULTS.md
├── 01-first-test.js
├── 04-pizza-api.js
├── 05-no-token.js
├── 06-thresholds.js
├── 07-requirement.js
├── 08-bug-hunt.js
├── explore.js
├── journey.js
├── a1-smoke.js
├── a2-average.js
├── a3-stress.js
├── a4-spike.js
├── a5-soak.js
└── reports/
    ├── a2-average.html
    ├── a3-stress.html
    ├── a4-spike.html
    └── a5-soak.html
```

---

## 🚀 Execution Instructions

### Part 0: Exploration & Bug Hunting
```powershell
k6 run 01-first-test.js
k6 run --vus 5 --duration 20s 08-bug-hunt.js
```

### Part A: Performance Test Suite

```powershell
# Step A1: Smoke Test
k6 run a1-smoke.js

# Step A2: Average Load Test
k6 run --out web-dashboard=export=reports/a2-average.html a2-average.js

# Step A3: Stress Test
k6 run --out web-dashboard=export=reports/a3-stress.html a3-stress.js

# Step A4: Spike Test
k6 run --out web-dashboard=export=reports/a4-spike.html a4-spike.js

# Step A5: Soak Test
k6 run --out web-dashboard=export=reports/a5-soak.html a5-soak.js
```

---

## 📊 Results & Reflection
All detailed performance metrics, thresholds evaluation, bug hunting notes, and answers to Part B reflection questions are documented in [`RESULTS.md`](./RESULTS.md).