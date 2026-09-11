# ADR 001: vinext on Cloudflare Workers

## Status

Accepted

## Context

We need a frontend framework that:
- Deploys to Cloudflare Workers (edge computing, low latency in Bangladesh)
- Supports React Server Components for performance
- Works with our existing bun + Cloudflare Workers experience from Probaha
- Provides good developer experience (fast builds, HMR)

## Decision

Use **vinext** — Cloudflare's experimental Vite-based framework that compiles to Workers. It provides Next.js App Router patterns (RSC, route groups, layouts) while targeting the edge.

## Alternatives Considered

| Alternative | Pros | Cons |
|-------------|------|------|
| **Next.js 15 + @cloudflare/next-on-pages** | Mature, huge ecosystem | Heavier runtime, more edge-incompatible APIs, larger bundle |
| **Remix** | Edge-native, good DX | Different paradigm, smaller community |
| **SvelteKit** | Lightweight, edge-ready | Team knows React, not Svelte |
| **Plain Vite SPA** | Simplest | No SSR, no RSC, worse SEO |

## Consequences

- **Positive:** Edge-native, fast cold starts, familiar Next.js patterns, integrates with Cloudflare bindings (D1, KV, Images)
- **Negative:** Pre-1.0, smaller community, fewer tutorials, potential breaking changes
- **Risk:** If vinext is abandoned, migration path exists to standard Next.js (App Router patterns are similar)

## Mitigation

- Pin vinext version (don't use `latest`)
- Keep business logic framework-agnostic (services, types, utils in separate files)
- Document framework-specific patterns for future migration
