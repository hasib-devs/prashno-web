# ADR 004: Dashboard Navigation Pattern — Sidebar

## Status

Accepted

## Context

The dashboard has 7+ sections (Dashboard, Questions, OMR, Exams, Students, Reports, Settings). Navigation must:
- Scale as features are added
- Work on desktop (primary) and tablet (secondary)
- Show active state clearly
- Support quick switching between sections

## Decision

**Left sidebar navigation**, collapsible to icon-only mode. 240px expanded, 64px collapsed. Always visible on `lg+` breakpoints, hidden behind hamburger on mobile.

## Alternatives Considered

| Pattern | Pros | Cons |
|---------|------|------|
| **Top tabs** | Familiar, no sidebar space | Limited items, doesn't scale |
| **Command palette (Cmd+K)** | Power-user friendly | Not discoverable, needs fallback |
| **Breadcrumbs + top nav** | Clean | Two navigation systems, confusing |
| **Bottom nav (mobile-first)** | Good for mobile | Wastes screen space on desktop |

## Sidebar Structure

```
┌─────────────────────┐
│ Logo           [≡]  │
├─────────────────────┤
│ 🏠 Dashboard        │
│ 📝 Questions        │
│ 📊 OMR              │
│ 💻 Exams            │
│ 👥 Students         │
│ 📈 Reports          │
├─────────────────────┤
│ ⚙️ Settings         │
│ ❓ Help             │
└─────────────────────┘
```

## Active State

- Left 3px accent border
- `bg-accent-light` background
- `accent` text color
- Bold font weight

## Consequences

- **Positive:** Scales to 10+ items, always visible, familiar SaaS pattern
- **Negative:** Takes horizontal space (mitigated by collapse toggle)
- **Mobile:** Full-screen overlay with backdrop blur
