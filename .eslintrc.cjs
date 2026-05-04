// .eslintrc.cjs
// Usamos .cjs (CommonJS) porque Vite configura el proyecto como ESModule (type: "module" en package.json)
// y los archivos de configuración de herramientas como ESLint aún necesitan CommonJS.

module.exports = {
  root: true,         // Le dice a ESLint que esta es la raíz, no busque configs en carpetas superiores
  env: {
    browser: true,    // Habilita variables globales del navegador: window, document, etc.
    es2022: true,     // Habilita sintaxis moderna de JavaScript (async/await, optional chaining, etc.)
    node: true,       // Habilita variables de Node.js: process, require, etc.
  },
  extends: [
    'eslint:recommended',             // Reglas básicas recomendadas por ESLint
    'plugin:react/recommended',        // Reglas recomendadas para React
    'plugin:react-hooks/recommended',  // Reglas para uso correcto de Hooks
    'plugin:react/jsx-runtime',        // Permite JSX sin importar React en cada archivo (React 17+)
    'prettier',                        // DEBE IR AL FINAL: desactiva reglas de ESLint que chocan con Prettier
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],  // No lintear el build ni este archivo
  parserOptions: {
    ecmaVersion: 'latest',   // Parsear JavaScript moderno
    sourceType: 'module',    // Archivos son ESModules (import/export)
    ecmaFeatures: {
      jsx: true,             // Habilitar parseo de JSX
    },
  },
  settings: {
    react: {
      version: 'detect',     // Detecta automáticamente la versión de React instalada
    },
  },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    // React
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off',           // Desactivamos PropTypes (usaremos JSDoc o TypeScript futuro)

    // Prettier: cualquier diferencia de formato se reporta como error de ESLint
    'prettier/prettier': 'error',

    // Buenas prácticas generales
    'no-console': 'warn',                // Avisa si dejas console.log (no error, solo aviso)
    'no-unused-vars': ['warn', {         // Avisa de variables declaradas pero no usadas
      argsIgnorePattern: '^_',           // Ignora argumentos que empiecen con _ (convención para "intencionalmente no usado")
    }],
    'prefer-const': 'error',             // Obliga a usar const cuando la variable no se reasigna
  },
};