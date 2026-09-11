# ADR 003: Typography Choice — Noto Sans Bengali + Inter

## Status

Accepted

## Context

Bengali web fonts have limited options. The choice affects:
- Readability across devices and sizes
- Brand perception (modern vs. traditional)
- Loading performance (font file sizes)
- Pairing with English text

## Decision

**Noto Sans Bengali** for Bengali content, **Inter** for English/numbers. Both loaded from Google Fonts with `display=swap` for performance.

## Alternatives Considered

| Font | Pros | Cons |
|------|------|------|
| **SolaimanLipi** | Very familiar in BD, excellent readability | Traditional feel, larger file size, less "SaaS" |
| **Hind Siliguri** | Modern, geometric | Less readable at small sizes, less common |
| **AponaLohit** | Classic screen font | Dated feel, poor hinting on retina |
| **Kalpurush** | Clean, popular | Licensing restrictions, less weight variety |

## Loading Strategy

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap');
```

- `display=swap` prevents FOIT (flash of invisible text)
- Preload critical weights (400, 600) in `<head>`
- Subset to Latin + Bengali ranges only

## Consequences

- **Positive:** Clean, modern, free, excellent web rendering, good weight range
- **Negative:** Noto Sans Bengali is wider than SolaimanLipi (may affect line lengths)
- **Mitigation:** Test line lengths at all breakpoints, adjust `max-width` on text containers
