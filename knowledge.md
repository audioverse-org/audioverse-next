# AudioVerse Next Project Knowledge

## Project Overview

AudioVerse Next is a web application for serving audio content. Built with Next.js and TypeScript.

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Keep components simple and focused
- Use React hooks for state management

### Testing

- Write tests for new features

### Internationalization

- Use react-intl for translations
- Extract strings with `npm run intl`
- Support multiple languages defined in `src/lib/constants.ts`
- Always provide default English messages

### Build and Deploy

- Node.js version specified in `.nvmrc`
- Run `npm run build:dev` to verify build
- Development server: `npm run dev`
- Production build includes PWA support

### Package Management

- Use npm as package manager
- Keep dependencies up to date
- Run `npm audit` to check for vulnerabilities

## Project Structure

- `/src` - Application source code
- `/public` - Static assets and translations
- `/src/pages` - Next.js routing
- `/src/containers` - Next.js components for page rendering
- `/src/components` - Reusable React components
- `/src/lib` - Shared utilities and constants

## Important URLs

- Development: http://localhost:3000
- Production: https://www.audioverse.org

## Common Tasks

1. Adding new pages:
   - Create file in `/src/pages`
   - Follow Next.js routing conventions
2. Adding translations:
   - Add strings to language files
   - Run `npm run intl` to compile
3. Running tests:
   - `npm run test` - Regular test suite
   - `npm run test:watch` - Watch mode for development
   - `npm run test:strict` - Strict mode tests, used in CI
4. Code quality:
   - `npm run lint` - Run ESLint
   - `npm run format:fix` - Fix formatting with Prettier
