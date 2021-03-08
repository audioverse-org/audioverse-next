# audioverse-next

## Getting Started

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

## Module shorthand

Module paths must be mapped in both `tsconfig.json` and `package.json`.
[More info](https://github.com/kulshekhar/ts-jest/issues/414#issuecomment-369876280)
