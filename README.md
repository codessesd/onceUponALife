# Once Upon A Life

Welcome to **Once Upon A Life**.

## 🚀 Demo

Experience the app live:  
👉 [http://onceuponalife.obscode.joburg/](http://onceuponalife.obscode.joburg/)

---

## About

Once Upon A Life will help you visualize and reflect your life.

---

## Age / Years-Lived Calculation Logic

We estimate full years lived by dividing total days lived by **365.25** (average year length including leap years) and then applying a tiny corrective offset (the "balancer") before `Math.floor()` so exact birthdays map to the expected integer.

### Why 365.25?

Using 365 ignores leap days and drifts ≈1 day every 4 years. 365.25 is the long‑term Gregorian average and gives a stable approximation for a life visualization.

### The Rounding Issue

If we use exactly 365 real days:

```
365 / 365.25 = 0.999315...   // floor -> 0 (we don't want this)
```

We want 1. So we nudge by a constant just enough so the floor lands on 1 at whole‑year boundaries.

### The Balancer

```
balancer = 1 - 365 / 365.25 ≈ 0.00068446269678
```

Adjustment pattern (birth year perspective in the 4‑year cycle):

1. Leap year birth: add `balancer`
2. Year before a leap year: subtract `balancer * 2`
3. Even non‑leap year: subtract `balancer`
4. Year after a leap year: no adjustment

This keeps the floored value aligned with completed birthdays without heavy calendar math.

### Snapshot Examples

| Case                         | Raw (days/365.25) | Adjust       | Floor |
| ---------------------------- | ----------------- | ------------ | ----- |
| 365 days                     | 0.9993155         | + balancer   | 1     |
| 730 days (pre‑leap pattern)  | 2.0013689         | − 2×balancer | 2     |
| 1095 days (even non‑leap)    | 3.0006844         | − balancer   | 3     |
| 1461 days (cycle incl. leap) | ≈4                | none         | 4     |

### Trade‑offs

Fast, deterministic, visually accurate for this grid. Not a substitute for precise legal/medical age computations (where a true calendar diff library would be preferable).

### Possible Future Improvements

- Replace heuristic with date-fns / dayjs precise diff and benchmark.
- Unit tests for Feb 29 edge cases & leap transitions.

Implementation site: `resources/js/Pages/Index.vue` (see inline comment near years calculation watcher).
