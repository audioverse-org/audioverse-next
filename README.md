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

Extract and compile all translatable strings using:

```bash
npm run intl
```

Modify files in `public/lang` to translate strings.

The compiled translations will be available in `public/compiled-lang`.

## GraphQL Code Generation

```bash
npm run codegen
```

## Eslint

Debugging commands:

```bash
DEBUG=eslint:cli-engine npm run lint
TIMING=1 npm run lint
```
