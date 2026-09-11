# ADR 005: Pricing Model — Tiered SaaS (Free/Starter/Pro)

## Status

Accepted

## Context

Bangladeshi teachers are price-sensitive and hesitant to pay before trying. We need a model that:
- Builds trust through a free tier
- Captures value from power users
- Scales with institution growth
- Supports monthly and annual billing

## Decision

**Three-tier subscription:**
- **Free:** 50 questions/month, 5 exams/month, 10 OMR scans/month — no credit card
- **Starter (৳299/month):** Unlimited questions, 50 exams/month, 100 OMR scans, cloud backup
- **Pro (৳799/month):** Everything unlimited, custom branding, priority support

Annual billing: 2 months free (10 months price for 12 months).

## Alternatives Considered

| Model | Pros | Cons |
|-------|------|------|
| **Per-teacher** | Simple | Doesn't scale for institutions |
| **Per-institution** | Higher ARPU | Harder to sell, needs sales team |
| **Credit-based** | Pay-per-use | Unpredictable costs deter users |
| **One-time purchase** | Simple | No recurring revenue, hard to sustain |

## Free Tier Strategy

The free tier exists to:
1. Let teachers experience value before paying
2. Create word-of-mouth (teachers tell colleagues)
3. Build question bank network effects

Limits are generous enough to be useful but constrained enough to encourage upgrade (e.g., 50 questions/month is enough for one exam, not enough for weekly tests).

## Consequences

- **Positive:** Low barrier to entry, clear upgrade path, predictable revenue
- **Negative:** Free tier costs infrastructure (mitigated by D1/KV low costs)
- **Risk:** Free users who never convert — mitigated by usage analytics and targeted upgrade prompts
