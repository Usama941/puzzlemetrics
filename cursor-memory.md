# PuzzleMetrics — Project Memory for Cursor

## What this project is
Complete ground-up rebuild of puzzlemetrics.com using Next.js 15 App Router.
PuzzleMetrics is a UK-based AI company offering SaaS AI agents, RAG systems,
Meta & Google Ads intelligence, campaign automation, data analytics, and AI consulting.
Two live products: City Rosters (sports mgmt, 1200+ users) and Lead Gen Platform.

## Full spec
The complete SRS v2 document (PuzzleMetrics_SRS_v2.docx) contains:
- Full design system (colours, fonts, spacing, animation specs)
- Every homepage section spec (10 sections)
- All inner page specs
- Admin panel spec (super_admin + chat_operator roles)
- Chat system spec
- Database schema (16 models)
- All API routes
- Build order (12 phases)

Always refer to the SRS before building anything. Ask me to paste the relevant
section if you need it.

## Current build phase
→ Phase 1: Not started yet. Begin with database schema + auth system.

## Logo
Puzzle piece shape (NOT a simple rounded square).
RIGHT: convex nub out. LEFT: socket cut in. BOTTOM: socket cut in. TOP: clean.
SVG viewBox: 0 0 210 215
Outer path (violet #6055D9):
M 48,10 Q 18,10 18,40 L 18,86 C 8,86 0,91 0,99 C 0,107 8,112 18,112 L 18,172 Q 18,192 38,192 L 80,192 C 80,202 85,210 95,210 C 105,210 110,202 110,192 L 158,192 Q 178,192 178,172 L 178,112 C 188,112 196,107 196,99 C 196,91 188,86 178,86 L 178,40 Q 178,10 148,10 Z

## Loader animation (DONE - file exists)
src/components/public/layout/LoaderScreen.tsx
3-step sequence: outer puzzle → inner piece → P letter → wordmark → progress bar

## Key decisions already made
- No NextAuth — custom JWT in httpOnly cookies
- No headless CMS — custom admin panel
- Cloudinary for image uploads
- Resend for email
- Socket.io for live chat
- PostgreSQL + Prisma ORM
- Vercel for deployment
