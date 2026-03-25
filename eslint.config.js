import js from '@eslint/js';

import react from 'eslint-plugin-react';

import reactHooks from 'eslint-plugin-react-hooks';

import globals from 'globals';

export default [
  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // ========== ПРАВИЛА ДЛЯ ПУСТЫХ СТРОК ==========
      'padding-line-between-statements': [
        'error',

        // ❌ Между импортами НЕ ДОБАВЛЯТЬ пустые строки
        { blankLine: 'any', prev: 'import', next: 'import' },

        // ✅ После импортов — пустая строка (но не между ними)
        { blankLine: 'always', prev: 'import', next: '*' },

        // ✅ Между константами и функциями/компонентами
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: ['function', 'export'] },
        { blankLine: 'always', prev: ['function', 'export'], next: ['const', 'let', 'var'] },

        // ✅ Между функциями
        { blankLine: 'always', prev: ['function'], next: ['function'] },

        // ✅ Перед export default
        { blankLine: 'always', prev: '*', next: 'export' },

        // ✅ Перед return
        { blankLine: 'always', prev: '*', next: 'return' },
      ],

      'lines-between-class-members': ['error', 'always'],

      // React правила
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  {
    ignores: ['node_modules/', 'dist/', 'build/'],
  },
];
