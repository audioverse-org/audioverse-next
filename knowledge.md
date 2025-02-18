# AudioVerse Next Project Knowledge

## Project Overview

AudioVerse Next is a web application for serving audio content. Built with Next.js and TypeScript.

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Keep components simple and focused
- Use React hooks for state management

### Component Organization

Components are organized into a hierarchy based on their complexity and composition:

#### Atoms

- Smallest building blocks of the interface
- Single-purpose, highly reusable
- No dependencies on other components
- Examples: buttons, inputs, icons, labels, headings
- Should be completely self-contained
- May have their own state but it should be simple

#### Molecules

- Combinations of atoms to form more complex components
- Reusable across different contexts
- May depend on atoms but not on organisms
- Examples: search bars, form fields with labels, cards
- Can maintain their own state
- Should be focused on a single responsibility

#### Organisms

- Complex UI components composed of molecules and/or atoms
- May be specific to a certain context or reusable
- Can depend on molecules and atoms
- Examples: navigation bars, forms, content sections
- Often maintain complex state
- May integrate with external services or APIs
- May coordinate between multiple sub-components

#### Templates

- Page-level components that arrange organisms
- Define the structure of a page or major section
- Can depend on any other component type
- Examples: layouts, page shells, authentication wrappers
- Often provide context or state to child components
- May handle routing or page-level concerns

### Component Patterns

#### URL Generation
- Components that need to generate URLs should accept a URL generator function prop
- This allows the parent to control URL structure while keeping the component reusable
- Example:
  ```typescript
  interface Props {
    getVersionUrl: (version: VersionFragment) => string;
  }
  ```
- Benefits:
  - Components remain context-agnostic
  - Same component can generate different URL patterns based on context
  - Makes testing easier as URL generation can be mocked
  - Avoids hardcoding route structure in reusable components

### Component Structure

Each component should have its own directory if it needs additional files:

- `index.tsx` - Component implementation
- `index.module.scss` - Scoped styles
- `index.graphql` - GraphQL fragments for typing

### Component Guidelines

- Extract shared UI patterns into appropriate level based on complexity
- Use GraphQL fragments for typing when interfacing with API data
- Keep components focused and single-purpose
- Consider moving components to a lower level (e.g. organism to molecule) if they become more general purpose
- Place page-specific components in `/src/containers`

### Testing

- Write tests for new features
- Do not run builds to test changes - they take too long
- Instead rely on TypeScript, tests, and linting

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

### GraphQL Data Flow

The project follows a depth-first approach to GraphQL data requirements:

1. Leaf Components

   - Define fragments for their exact data needs
   - Live in `.graphql` files alongside component
   - Example: A Card component defines what fields it needs to render

2. Parent Components

   - Compose child fragments into larger fragments
   - Add any additional fields they need
   - Example: A CardList composes multiple Card fragments plus pagination fields

3. Query Composition
   - Server-Side Queries:
     - Live alongside page containers
     - Compose fragments from organisms and templates
     - Used in getServerSideProps/getStaticProps
     - Example: `src/containers/blog.graphql`
   - Client-Side Queries:
     - Live alongside the component using the data
     - Compose fragments needed by that component tree
     - Used with auto-generated Tanstack Query hooks
     - Example: `src/components/organisms/preferencesForm.graphql`

Benefits:

- Components are self-contained with their data requirements
- Types flow naturally up the component tree
- Easier to maintain as data needs change
- Prevents over-fetching by being explicit
- Enables efficient query composition

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
