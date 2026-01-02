import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),

  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'arrow-parens': 'off', 'one-var': 'off',
      'no-void': 'off',
      'multiline-ternary': 'off',
      // Force curly braces for all control statements (no single-line ifs)
      'curly': ['error', 'all'],
      // Enforce a line break after the opening brace and before the closing brace
      'brace-style': ['error', '1tbs', { 'allowSingleLine': false }],
      'prefer-promise-reject-errors': 'off',
      'quotes': ['warn', 'single', { avoidEscape: true }],

      'import/first': 'off',
      'import/namespace': 'error',
      'import/default': 'error',
      'import/export': 'error',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off',

      'import/order': ['warn', {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
        groups: [
          'index',
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent']
        ]
      }],

      'no-prototype-builtins': 'warn',

      'no-mixed-operators': 'off',
      '@stylistic/no-mixed-operators': 'warn',

      '@stylistic/member-delimiter-style': ['warn', {
        'singleline': {
          'delimiter': 'semi',
          'requireLast': true
        },
      }],

      // The checks it provides are already provided by typescript, disable to fix global type declaration.
      'no-undef': 'off',
      'no-redeclare': 'off',

      // Note: you must disable the base rule as it can report incorrect errors
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          caughtErrors: 'none'
        }
      ],

      '@typescript-eslint/consistent-type-imports': ['error', {
        fixStyle: 'inline-type-imports',
        prefer: 'type-imports',
      }],

    }
  }
])

export default eslintConfig;
