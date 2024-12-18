# Big Picture Plan

## Overview
Develop a voting application to visualize the impact of public votes in a representative democracy.
![BPP](bpp.png)

## Features
- **Representative Management:** Add and list representatives with unique emails.
- **Elections:** Create, view, and conclude elections with multiple choices.
- **Voting System:** Public votes for representatives; representatives cast aggregated votes.
- **Results Visualization:** Display public vote counts, winning choices, and representative agreement rates.
- **Statistics:** Show alignment between public voters and representatives through detailed metrics.
- **Data Seeding:** Populate the database with 4 years of sample data using the service layer.

## Technology Stack
Next.js, TypeScript, Drizzle, Postgres, Zod, ESLint, Prettier.

## Architecture
- feature-sliced architecture
- factory methods for feature/service/repository
- unit testing for business logic
- routing layer with Next.js App Router


## Getting Started

First, run the development server:

```bash
docker compose up
pnpm seed
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
