# Conventions

## Language

Everything in the code is written in English: comments, identifiers, log and error messages,
workflow names, config files and project docs (README, this file).

French is only for content that visitors see or hear: page copy, the data in `src/data/`, `aria-label`
values, and page URLs such as `/mentions-legales`.

## Tooling

Use bun, not npm: `bun install`, `bun run dev`, `bun run check`. There is no system Node, so run
Wrangler with `bun --bun x wrangler`.
