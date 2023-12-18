# Advent of Code 2023

My solutions to Advent of Code 2023 using TypeScript and Bun.

## Progress

- [x] Day 1
  - [x] Task 1
  - [x] Task 2
- [x] Day 2
  - [x] Task 1
  - [x] Task 2
- [x] Day 3
  - [x] Task 1
  - [x] Task 2
- [x] Day 4
  - [x] Task 1
  - [x] Task 2
- [x] Day 5
  - [x] Task 1
  - [x] Task 2
- [x] Day 6 ❄️
  - [x] Task 1
  - [x] Task 2
- [x] Day 7
  - [x] Task 1
  - [x] Task 2
- [x] Day 8
  - [x] Task 1
  - [x] Task 2
- [x] Day 9
  - [x] Task 1
  - [x] Task 2
- [x] Day 10
  - [x] Task 1
  - [x] Task 2
- [x] Day 11
  - [x] Task 1
  - [x] Task 2
- [x] Day 12
  - [x] Task 1
  - [x] Task 2
- [x] Day 13
  - [x] Task 1
  - [x] Task 2
- [x] Day 14
  - [x] Task 1
  - [x] Task 2
- [x] Day 15
  - [x] Task 1
  - [x] Task 2
- [x] Day 16
  - [x] Task 1
  - [x] Task 2
- [ ] Day 17
  - [ ] Task 1
  - [ ] Task 2
- [ ] Day 18
  - [ ] Task 1
  - [ ] Task 2
- [ ] Day 19
  - [ ] Task 1
  - [ ] Task 2
- [ ] Day 20
  - [ ] Task 1
  - [ ] Task 2
- [ ] Day 21
  - [ ] Task 1
  - [ ] Task 2
- [ ] Day 22
  - [ ] Task 1
  - [ ] Task 2
- [ ] Day 23
  - [ ] Task 1
  - [ ] Task 2
- [ ] Day 24 🎄
  - [ ] Task 1
  - [ ] Task 2
- [ ] Day 25
  - [ ] Task 1
  - [ ] Task 2

## Running

Install dependencies:

```bash
bun install
```

Any task can be run using `bun task` which by default runs the last task (can also be done explicitly with `bun task latest`). Alternativly a day `bun task day` (which will try to run part 2 first and part 1 secondly), or a specific task (`bun task day-part`).

Tasks try to get input specific to that day (e.g for task `4-1`, it will get `inputs/4.txt`) or, if it doesn't exist, the default input (`inputs/default.txt`).

It's also possible to use example inputs by including `true` after the task to be run (e.g. `bun task latest true`), which work the same as regular inputs, but placed within the `example` folder.
