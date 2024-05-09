# audioverse-next

## Getting Started

this is a test of Github for John
Use nvm to switch to Node version:

```bash
nvm install
nvm use
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in browser.

## Translation

Extract all translatable strings to `public/lang/en.json` using
`npm run extract`.

Modify and add files in `public/lang` to translate strings.

Run `npm run compile` to compile translated strings into
machine-readable files in `public/compiled-lang`.

## GraphQL Code Generation

```bash
npm run graphql:codegen
```

Compiles to `src/lib/generated/graphql.ts`

## Eslint

Debugging commands:

```bash
DEBUG=eslint:cli-engine npm run lint
TIMING=1 npm run lint
```
