import globals from 'globals';

/**
 * Flat ESLint config.
 *
 * The deck's JavaScript lives inline in index.html; `npm run lint` runs
 * deck-check first, which extracts those blocks to .build/inline/*.js — those
 * extracted files are what ESLint sees for the browser code.
 */
export default [
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  {
    // Browser code extracted from the single-file deck (deliberately ES5-style).
    files: ['.build/inline/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'script',
      globals: { ...globals.browser }
    },
    linterOptions: { reportUnusedDisableDirectives: true },
    rules: {
      'no-undef': 'error',
      // The deck is deliberately written in ES5 syntax (it is opened straight
      // from disk by non-technical readers), so the optional catch binding is
      // not available and `catch (e) {}` guards are intentional.
      'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none', varsIgnorePattern: '^_' }],
      'no-redeclare': 'error',
      'no-dupe-keys': 'error',
      'no-dupe-args': 'error',
      'no-duplicate-case': 'error',
      'no-unreachable': 'error',
      'no-cond-assign': 'error',
      'no-constant-condition': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-obj-calls': 'error',
      'no-sparse-arrays': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
      eqeqeq: ['error', 'smart'],
      'no-implicit-globals': 'error',
      'no-shadow-restricted-names': 'error'
    }
  },
  {
    // Node: the static server and the build tooling.
    files: ['server.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: { ...globals.node }
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': ['error', { args: 'none' }],
      eqeqeq: ['error', 'smart']
    }
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node }
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': ['error', { args: 'none' }],
      eqeqeq: ['error', 'smart']
    }
  }
];
