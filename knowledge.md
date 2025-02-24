# AudioVerse Next Project Knowledge

## Project Overview

AudioVerse Next is a web application for serving audio and video content. Built with Next.js and TypeScript.

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Keep components simple and focused
- Use React hooks for state management
- Prefer clear variable/function names over comments
  - Good: `const isValidBiblePath = pathParts.length >= 6`
  - Bad: `// Check if path has enough parts for bible path`
  - Exception: Document complex business logic that can't be made obvious through naming

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
- Define the structure of a page
- Can depend on any other component type
- Examples: layouts, page shells, authentication wrappers
- Often provide context or state to child components
- May handle routing or page-level concerns

### Component Patterns

#### Theme Management

- Components that need different visual themes should:

  - Own their theme-specific CSS variables
  - Accept a theme prop with clear options (e.g. 'light' | 'dark')
  - Use CSS classes to switch between themes
  - Define base variables shared across themes
  - Define theme-specific variables in theme classes

  ```scss
  .base {
  	// Shared variables
  	--accent: #{$color};
  }

  .light {
  	--background: #{$white};
  	--text: #{$dark};
  }

  .dark {
  	--background: #{$dark};
  	--text: #{$white};
  }
  ```

- Benefits:
  - Component remains self-contained
  - Themes are explicit and type-safe
  - Easy to add new themes
  - CSS variables provide clean override mechanism

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
- Keep test support code in test files
  - Don't add code to production files just to support tests
  - Instead, mock or stub in the test files themselves
- Test naming and organization:
  - "renders" tests should verify successful component rendering
  - Error cases should be in separate tests like "renders 404"
- Colocate tests with their source files
- When testing async effects in hooks:
  - Use act() to wrap state updates not handled via react-testing-library
  - Use waitFor() to wait for async effects to complete
- When testing modules that are globally mocked:
  - Use jest.requireActual() to get the unmocked version in specific tests
  - Example: `const { default: MyModule } = jest.requireActual('./myModule')`
  - This allows testing the actual implementation while still mocking dependencies

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

### API URL Handling

When making API requests that need to work in both server and client contexts:

- Use URL constructor to properly parse and join URLs
- Handle server-side base URL (localhost) vs client-side (window.location)
- Clean URL paths by removing duplicate slashes and empty segments
- Use proper URL joining with base URLs and endpoints

### Bible API Integration

When working with the FCBH Bible API:

- Use BIBLE_BOOK_METAS to map book names to FCBH book IDs (e.g., "1 Samuel" -> "1SA")
- Append "DA" to Bible version IDs for fileset IDs (e.g., "ENGKJV2" -> "ENGKJVO2DA")
- Include v=4 parameter in all API requests
- Book IDs must use FCBH format (e.g., "1SA", "GEN") not full names
- Always decode URL-encoded book names (e.g., "1%20Samuel" -> "1 Samuel") before looking up FCBH IDs
- API endpoints:
  - List filesets: `/bibles/filesets/{filesetId}`
  - Get chapter audio: `/bibles/filesets/{filesetId}/{bookId}/{chapter}`
- Media URLs from the API expire, so they need to be refreshed periodically
- Base URL: https://4.dbt.io/api
- During SSR/build, make requests directly to FCBH API with API key
- In browser, proxy requests through Next.js API to protect API key

### Code Organization

When working with external APIs:

- Extract ID mapping/construction into dedicated helper functions
- Keep API request functions focused on making the request
- Separate concerns:
  - ID/parameter mapping (e.g., bookMetadata.ts)
  - ID construction (e.g., filesetId.ts)
  - API requests (e.g., fetchFcbhChapterMediaUrl.ts)
  - Response handling

### File Structure

- Colocate tests with their source files in the same directory
  - Example: `src/lib/getFoo.ts` and `src/lib/getFoo.spec.ts`
- Name files after their single exported function
  - Example: Function `getFcbhBookId` lives in `getFcbhBookId.ts`
- Tests use `.spec.ts` suffix

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

### Video Player Implementation

#### URL Refresh Patterns

When refreshing media URLs (e.g. for Bible audio):

- Use functional state updates to compare old/new URLs before updating
- Only trigger URL updates when URLs actually differ to prevent videojs feedback loops
- Track current media ID to prevent stale updates from race conditions
- Maintain initial URL while fetching fresh URL to prevent playback interruption

