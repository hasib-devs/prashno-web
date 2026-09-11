# ADR 002: Bilingual Content Strategy

## Status

Accepted

## Context

PrashnoKotha targets Bangladeshi teachers who are most comfortable in Bengali, but:
- Some technical terms are commonly used in English (OMR, login, dashboard)
- Future expansion to other markets may require English
- Teachers may want to switch languages

## Decision

**Bengali-primary with English toggle.** All marketing content, feature descriptions, and UI labels default to Bengali. Users can switch to English via a persistent toggle in the nav. The toggle state is stored in localStorage and synced with a cookie for SSR.

## Alternatives Considered

| Alternative | Pros | Cons |
|-------------|------|------|
| **Bengali-only** | Simplest, no i18n infrastructure | Limits future growth, some users prefer English |
| **English-primary with Bengali toggle** | More "modern" SaaS feel | Alienates core audience |
| **URL-based routing (/bn/, /en/)** | SEO-friendly, shareable | More complex routing, content duplication |
| **Auto-detect from browser** | Zero-config for users | Often wrong, hard to override |

## Conventions

- Bengali text uses **Noto Sans Bengali** (weights 400, 500, 600, 700)
- English text uses **Inter** (same weights)
- Technical terms (OMR, PDF, URL) remain in English within Bengali text
- Numbers use Bengali numerals (০-৯) in Bengali mode, Western (0-9) in English mode
- Dates use Bengali calendar format (e.g., ১১ সেপ্টেম্বর, ২০২৫)

## Consequences

- **Positive:** Serves core audience, future-proof, toggle is simple to implement
- **Negative:** All content must be translated, slightly larger bundle (two font sets)
- **Implementation:** Use a `useLanguage` hook + Context provider, store in cookie for SSR consistency
