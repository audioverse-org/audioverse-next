# Project Overview

audioverse-next is a modern web application for the AudioVerse platform, designed to deliver audio content, and resources. The project aims to provide a fast, accessible, and scalable experience for users seeking spiritual audio resources. It leverages Next.js for server-side rendering and static site generation, integrates with GraphQL for data fetching, and supports internationalization and accessibility best practices.

## Folder Structure

```
/ (root)
├── audit-ci.json
├── codegen.ts
├── CODEOWNERS
├── jest.config.ts / jest.config.strict.ts
├── knip.json
├── lang-formatter.js
├── next-build-webpack-only.js
├── next-env.d.ts
├── next-sitemap.config.js
├── next.config.js
├── pa11y-ci.json
├── package.json
├── README.md
├── schema.graphql
├── svgo.config.js
├── testSetup.ts / testSetup.strict.ts
├── tsconfig.json / tsconfig.test.json
├── __mocks__/
├── graphql-codegen/
├── public/
│   ├── compiled-lang/
│   ├── img/
│   ├── lang/
├── scripts/
├── src/
│   ├── __generated__/
│   ├── components/
│   ├── containers/
│   ├── lib/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── types/
├── worker/
```

### Key Directories

- `src/`: Main application source code, including components, containers, pages, services, and types.
- `public/`: Static assets, images, language files, and service workers.
- `graphql-codegen/`: Custom GraphQL code generation plugins.
- `scripts/`: Utility scripts for language extraction and updates.
- `__mocks__/`: Mock files for testing.
- `worker/`: Worker scripts for background tasks.

## Coding Standards and Conventions

- **Language:** TypeScript (preferred), JavaScript for some scripts and configs.
- **Naming:** Use camelCase for variables and functions, PascalCase for components and classes, kebab-case for filenames and directories.
- **Formatting:** Follow Prettier defaults. Indent with 2 spaces. Use trailing commas where possible. Prefer single quotes for strings.
- **Best Practices:**
  - Use functional React components.
  - Prefer hooks over class components.
  - Write unit and integration tests for new features.
  - Use GraphQL fragments for modular queries.
  - Ensure accessibility (a11y) in UI components.
  - Internationalize user-facing text.

## Tools, Libraries, and Frameworks

- **Next.js**: Main framework for SSR/SSG (see `next.config.js`).
- **React**: UI library.
- **TypeScript**: Type safety and tooling.
- **GraphQL**: Data layer (`schema.graphql`, custom codegen plugins).
- **Jest**: Testing framework (`jest.config.ts`).
- **SVGO**: SVG optimization (`svgo.config.js`).
- **Pa11y**: Accessibility testing (`pa11y-ci.json`).
- **Knip**: Unused code detection (`knip.json`).
- **audit-ci**: Dependency audit (`audit-ci.json`).
- **Internationalization**: Language files in `public/lang/` and `public/compiled-lang/`.
- **Custom Scripts**: Language extraction and update scripts in `scripts/`.

## Configuration

- TypeScript configuration in `tsconfig.json` and `tsconfig.test.json`.
- Jest configuration in `jest.config.ts` and `jest.config.strict.ts`.
- Next.js configuration in `next.config.js`.
- GraphQL schema in `schema.graphql`.
