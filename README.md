# 🏛️ Agencia Kleos — Landing Page

> Documentación oficial del proyecto: setup desde cero, flujo de trabajo en equipo, convenciones y despliegue en Hostinger.
> Escrita para ser leída por los 4 integrantes del equipo, incluyendo personas sin experiencia previa en el stack.

---

## 📋 Tabla de Contenidos

1. [Resumen del Stack](#1-resumen-del-stack)
2. [Paso 0 — Instalar herramientas en Mac Mini](#2-paso-0--instalar-herramientas-en-mac-mini)
3. [Paso 1 — Crear el proyecto con Vite + React](#3-paso-1--crear-el-proyecto-con-vite--react)
4. [Paso 2 — Estructura de carpetas profesional](#4-paso-2--estructura-de-carpetas-profesional)
5. [Paso 3 — Configurar ESLint y Prettier](#5-paso-3--configurar-eslint-y-prettier)
6. [Paso 4 — Configurar Husky + Commitlint (Conventional Commits)](#6-paso-4--configurar-husky--commitlint-conventional-commits)
7. [Paso 5 — Inicializar Git y subir a GitHub](#7-paso-5--inicializar-git-y-subir-a-github)
8. [Paso 6 — Flujo de trabajo en equipo (Git Workflow)](#8-paso-6--flujo-de-trabajo-en-equipo-git-workflow)
9. [Paso 7 — Convención de Commits (Conventional Commits)](#9-paso-7--convención-de-commits-conventional-commits)
10. [Paso 8 — Configurar y desplegar en Hostinger](#10-paso-8--configurar-y-desplegar-en-hostinger)
11. [Paso 9 — Variables de entorno](#11-paso-9--variables-de-entorno)
12. [Archivos de configuración explicados línea a línea](#12-archivos-de-configuración-explicados-línea-a-línea)
13. [Comandos rápidos del día a día](#13-comandos-rápidos-del-día-a-día)
14. [Preguntas frecuentes (FAQ)](#14-preguntas-frecuentes-faq)

---

## 1. Resumen del Stack

| Herramienta | Versión recomendada | ¿Por qué esta versión? |
|---|---|---|
| **Node.js** | v20.x LTS "Iron" | Es la versión LTS activa (Long Term Support). Garantiza soporte hasta abril 2026. Hostinger también la soporta. Nunca usar versiones impares (19, 21) en producción: son experimentales. |
| **npm** | v10.x (viene con Node 20) | Incluido con Node 20. Es más rápido que npm 9 y tiene mejor manejo de paquetes duplicados. |
| **Vite** | v8.0.10 | El bundler más rápido del ecosistema React hoy. Reemplaza a Create React App (CRA), que está abandonado. Arranca el dev server en milisegundos gracias a ESModules nativos. Genera builds optimizados para producción. |
| **@vitejs/plugin-react** | v6.0.1 | Plugin oficial de Vite para React. Habilita JSX, Fast Refresh y optimizaciones de React. Debe mantenerse en sync con la versión de Vite. |
| **esbuild** | v0.28.0 | Minificador ultrarrápido usado internamente por Vite para el build de producción. |
| **React** | v18.3.1 | Versión estable actual. Incluye Concurrent Mode, Suspense mejorado y hooks modernos. |
| **React DOM** | v18.3.1 | Par de React, siempre la misma versión. |
| **ESLint** | v8.x | El linter estándar de JavaScript/React. Detecta errores de código antes de que ocurran. |
| **Prettier** | v3.x | Formateador de código automático. Elimina debates sobre estilo en el equipo. |
| **Husky** | v9.x | Ejecuta scripts antes de cada commit (Git hooks). Impide subir código sin formato o con errores. |
| **lint-staged** | v15.x | Ejecuta ESLint y Prettier solo en los archivos que vas a commitear (no en todo el proyecto). |
| **commitlint** | v19.x | Valida que cada commit siga el estándar Conventional Commits. |
| **Git** | v2.x (última) | Control de versiones. |
| **Express** | v4.x | Servidor mínimo para servir el build de React en Hostinger con Node.js. |

### ¿Por qué Vite y no Create React App (CRA)?

CRA fue deprecado oficialmente por el equipo de React en 2023. Vite es:
- **10-100x más rápido** en arranque de desarrollo.
- **Activamente mantenido** por la comunidad.
- **Estándar de la industria** para proyectos nuevos.
- Compatible con el ecosistema completo (ESLint, TypeScript, etc.).

---

## 2. Paso 0 — Instalar herramientas en Mac Mini

> Esto solo lo hace **una persona** (quien configura el proyecto por primera vez). El resto del equipo solo necesita Node.js y Git.

### 2.1 — Instalar Homebrew (gestor de paquetes para macOS)

Homebrew es el gestor de paquetes de macOS. Permite instalar Node, Git y otras herramientas desde la terminal de forma sencilla y actualizable.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Cuando termine, ejecuta los dos comandos que te muestre en pantalla para agregar Homebrew al PATH (serán algo como `echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile`). Cierra y vuelve a abrir la terminal.

Verifica:
```bash
brew --version
# Homebrew 4.x.x
```

### 2.2 — Instalar Node.js v20 LTS

Usamos `nvm` (Node Version Manager) para instalar Node. Esto permite tener múltiples versiones de Node y cambiar entre ellas sin conflictos. Es la práctica estándar en equipos profesionales.

```bash
# 1. Instalar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 2. Cierra y vuelve a abrir la terminal, luego verifica:
nvm --version
# 0.39.7

# 3. Instalar Node 20 LTS
nvm install 20

# 4. Establecerlo como versión por defecto
nvm use 20
nvm alias default 20

# 5. Verificar
node --version
# v20.x.x
npm --version
# 10.x.x
```

### 2.3 — Instalar Git

```bash
brew install git

# Verificar
git --version
# git version 2.x.x
```

### 2.4 — Configurar Git con tu identidad

Este paso lo hace **cada integrante del equipo en su propia computadora**. Es fundamental para que los commits aparezcan con el nombre correcto en GitHub.

```bash
git config --global user.name "Tu Nombre Completo"
git config --global user.email "tu@email.com"

# Establecer 'main' como rama principal por defecto (estándar moderno)
git config --global init.defaultBranch main

# Editor de git (para mensajes de merge, etc.) — VSCode es lo más cómodo
git config --global core.editor "code --wait"
```

### 2.5 — Instalar Visual Studio Code (recomendado)

Descárgalo desde https://code.visualstudio.com y arrástralo a /Applications.

**Extensiones recomendadas para el equipo** (instalar en VSCode):
- `ESLint` (dbaeumer.vscode-eslint)
- `Prettier - Code formatter` (esbenp.prettier-vscode)
- `GitLens` (eamodio.gitlens) — historial de Git visual
- `Git Graph` (mhutchie.git-graph) — árbol de ramas visual
- `Auto Rename Tag` (formulahendry.auto-rename-tag)
- `Path Intellisense` (christian-kohler.path-intellisense)

Para instalar todas de una:
```
CMD + SHIFT + P → "Extensions: Install Extensions" → busca cada una
```

---

## 3. Paso 1 — Crear el proyecto con Vite + React

```bash
# 1. Ve a la carpeta donde quieres guardar tus proyectos
cd ~/Documentos  # o la carpeta que prefieras

# 2. Crea el proyecto con Vite
# El nombre 'agencia-kleos' es la convención kebab-case para proyectos en Git:
# - Todo en minúsculas
# - Palabras separadas por guiones (no espacios, no mayúsculas, no guiones bajos)
# - Descriptivo y corto
npm create vite@latest agencia-kleos -- --template react

# Cuando te pregunte:
# ✔ Select a framework: › React
# ✔ Select a variant: › JavaScript
# (No TypeScript por ahora para mantener la curva de entrada baja en el equipo)

# 3. Entra a la carpeta del proyecto
cd agencia-kleos

# 4. Instala las dependencias base
npm install

# 5. Prueba que funciona
npm run dev
# Abre http://localhost:5173 en tu navegador — deberías ver la pantalla de bienvenida de Vite
```

---

## 4. Paso 2 — Estructura de carpetas profesional

Después de crear el proyecto, la estructura por defecto de Vite es básica. La vamos a organizar de forma profesional. Ejecuta estos comandos desde la raíz del proyecto:

```bash
# Elimina los archivos de ejemplo que crea Vite
rm src/App.css src/assets/react.svg public/vite.svg

# Crea la estructura de carpetas
mkdir -p src/assets/images
mkdir -p src/assets/fonts
mkdir -p src/assets/icons
mkdir -p src/components/ui
mkdir -p src/components/sections
mkdir -p src/hooks
mkdir -p src/layout
mkdir -p src/pages
mkdir -p src/styles
mkdir -p src/utils
mkdir -p src/constants
mkdir -p .github
```

### La estructura final debe verse así:

```
agencia-kleos/
│
├── public/                         # Archivos estáticos servidos directamente
│   └── favicon.ico                 # Favicon del sitio
│
├── src/                            # Todo el código fuente vive aquí
│   │
│   ├── assets/                     # Recursos estáticos importados por JS
│   │   ├── images/                 # Imágenes (jpg, png, webp, svg que se importan)
│   │   ├── fonts/                  # Fuentes personalizadas (.woff2, .ttf)
│   │   └── icons/                  # Íconos SVG como componentes
│   │
│   ├── components/                 # Componentes React reutilizables
│   │   ├── ui/                     # Átomos: Button, Card, Badge, Input, etc.
│   │   │   └── Button/
│   │   │       ├── Button.jsx
│   │   │       └── index.js        # Re-exporta: export { default } from './Button'
│   │   └── sections/               # Secciones de la landing: Hero, About, Services, etc.
│   │       ├── Hero/
│   │       │   ├── Hero.jsx
│   │       │   └── index.js
│   │       ├── About/
│   │       ├── Services/
│   │       ├── Portfolio/
│   │       ├── Testimonials/
│   │       └── Contact/
│   │
│   ├── hooks/                      # Custom React Hooks (useWindowSize, useScrollPosition, etc.)
│   │
│   ├── layout/                     # Componentes que envuelven páginas: Navbar, Footer, Layout
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   └── Layout.jsx              # Wrapper principal: <Navbar/> + {children} + <Footer/>
│   │
│   ├── pages/                      # Vistas/páginas (aunque sea una landing, se separa)
│   │   └── Home/
│   │       ├── Home.jsx
│   │       └── index.js
│   │
│   ├── styles/                     # Estilos globales
│   │   ├── global.css              # Reset, variables CSS, estilos base
│   │   └── variables.css           # Variables CSS: colores, tipografías, espaciados
│   │
│   ├── utils/                      # Funciones utilitarias puras (no son componentes)
│   │   └── helpers.js
│   │
│   ├── constants/                  # Constantes del proyecto (textos, links, configuración)
│   │   └── index.js
│   │
│   ├── App.jsx                     # Componente raíz: routing y providers globales
│   └── main.jsx                    # Punto de entrada: ReactDOM.createRoot()
│
├── .github/                        # Configuración de GitHub
│   └── PULL_REQUEST_TEMPLATE.md    # Template para describir Pull Requests
│
├── .husky/                         # Scripts de Git hooks (se genera automáticamente)
│
├── .eslintrc.cjs                   # Reglas de ESLint
├── .prettierrc                     # Reglas de Prettier
├── .prettierignore                 # Archivos que Prettier no debe formatear
├── .gitignore                      # Archivos que Git no debe rastrear
├── commitlint.config.cjs           # Reglas de Conventional Commits
├── index.html                      # HTML raíz (Vite lo usa como entrada)
├── package.json                    # Dependencias y scripts del proyecto
├── server.js                       # Servidor Express para Hostinger
├── vite.config.js                  # Configuración de Vite
└── README.md                       # Este archivo
```

### ¿Por qué esta estructura?

- **`components/ui/`** — Componentes genéricos y reutilizables en todo el proyecto (botones, tarjetas). No dependen de la lógica de negocio.
- **`components/sections/`** — Secciones específicas de la landing (Hero, Servicios). Sí conocen el contenido del proyecto.
- **`layout/`** — Navbar y Footer que se repiten en todas las páginas. Separados para que sean fáciles de mantener.
- **`pages/`** — Aunque sea una landing de una sola página, tenerla en `pages/` prepara el proyecto para crecer.
- **`constants/`** — Textos, enlaces, configuraciones. Centraliza el contenido para que sea fácil modificar sin buscar en cada componente.
- **Patrón `index.js` en cada carpeta** — Permite importar con `import Hero from '@/components/sections/Hero'` en lugar de `'@/components/sections/Hero/Hero'`.

---

## 5. Paso 3 — Configurar ESLint y Prettier

### 5.1 — Instalar dependencias

```bash
npm install --save-dev \
  eslint \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-react-refresh \
  @eslint/js \
  prettier \
  eslint-config-prettier \
  eslint-plugin-prettier
```

**Qué instala cada paquete:**
- `eslint` — El linter principal.
- `eslint-plugin-react` — Reglas específicas de React (detecta errores en JSX).
- `eslint-plugin-react-hooks` — Valida que los Hooks se usen correctamente.
- `eslint-plugin-react-refresh` — Necesario para el Hot Module Replacement de Vite.
- `prettier` — El formateador automático de código.
- `eslint-config-prettier` — Desactiva las reglas de ESLint que entran en conflicto con Prettier.
- `eslint-plugin-prettier` — Hace que ESLint reporte las diferencias de Prettier como errores.

### 5.2 — Crear `.eslintrc.cjs`

Reemplaza el archivo existente con este contenido:

```js
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
```

### 5.3 — Crear `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "jsxSingleQuote": false,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

**Explicación de cada opción:**
- `"semi": true` — Siempre pone punto y coma al final de cada statement.
- `"singleQuote": true` — Usa comillas simples en JS (`'hola'` no `"hola"`).
- `"jsxSingleQuote": false` — En JSX usa comillas dobles (`className="container"`).
- `"trailingComma": "es5"` — Coma al final en objetos y arrays multi-línea (válido en ES5+).
- `"printWidth": 80` — Longitud máxima de línea de 80 caracteres.
- `"tabWidth": 2` — Indentación de 2 espacios.
- `"endOfLine": "lf"` — Salto de línea estilo Unix (LF). **Crítico para equipos en Mac+Windows**.

### 5.4 — Crear `.prettierignore`

```
node_modules
dist
build
.husky
public
```

### 5.5 — Agregar scripts a `package.json`

En la sección `"scripts"` del `package.json`, agrega:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "start": "node server.js",
  "lint": "eslint src --ext .js,.jsx --report-unused-disable-directives --max-warnings 0",
  "lint:fix": "eslint src --ext .js,.jsx --fix",
  "format": "prettier --write 'src/**/*.{js,jsx,css}'",
  "format:check": "prettier --check 'src/**/*.{js,jsx,css}'"
}
```

---

## 6. Paso 4 — Configurar Husky + Commitlint (Conventional Commits)

Husky intercepta los comandos de Git antes de que se ejecuten y corre nuestros scripts de validación. Así es imposible que alguien del equipo suba código con errores o con commits mal escritos.

### 6.1 — Instalar dependencias

```bash
npm install --save-dev husky lint-staged @commitlint/cli @commitlint/config-conventional
```

- `husky` — Maneja los Git hooks.
- `lint-staged` — Ejecuta linters solo en los archivos que van en el commit (no en todo el proyecto, lo que sería lento).
- `@commitlint/cli` — Herramienta que valida el mensaje del commit.
- `@commitlint/config-conventional` — Reglas del estándar Conventional Commits.

### 6.2 — Inicializar Husky

```bash
npx husky init
```

Este comando crea la carpeta `.husky/` y configura automáticamente el script `prepare` en `package.json`. El script `prepare` se ejecuta automáticamente cuando cualquier integrante del equipo hace `npm install`, por lo que Husky queda activo para todos sin que tengan que hacer nada extra.

### 6.3 — Configurar el hook `pre-commit`

Este hook se ejecuta antes de cada commit y corre lint-staged:

```bash
echo "npx lint-staged" > .husky/pre-commit
```

### 6.4 — Configurar el hook `commit-msg`

Este hook valida que el mensaje del commit siga el estándar Conventional Commits:

```bash
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

### 6.5 — Configurar `lint-staged` en `package.json`

Agrega esta sección al `package.json` (al mismo nivel que `"scripts"`):

```json
"lint-staged": {
  "src/**/*.{js,jsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "src/**/*.{css,json,md}": [
    "prettier --write"
  ]
}
```

### 6.6 — Crear `commitlint.config.cjs`

```js
// commitlint.config.cjs
// Define las reglas que deben seguir los mensajes de commit.
// Usamos la configuración "conventional" que implementa el estándar de Conventional Commits.

module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    // El tipo del commit (feat, fix, etc.) debe estar en minúsculas
    'type-case': [2, 'always', 'lower-case'],

    // El tipo es obligatorio
    'type-empty': [2, 'never'],

    // Solo se permiten estos tipos de commit (ver sección 9 para descripción de cada uno)
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nueva funcionalidad
        'fix',      // Corrección de error
        'docs',     // Cambios en documentación
        'style',    // Cambios de formato (espacios, comas) sin afectar lógica
        'refactor', // Refactorización de código sin nueva funcionalidad ni fix
        'perf',     // Mejora de rendimiento
        'test',     // Añadir o corregir tests
        'build',    // Cambios en sistema de build (vite.config, package.json)
        'ci',       // Cambios en integración continua
        'chore',    // Tareas de mantenimiento (actualizar deps, etc.)
        'revert',   // Revertir un commit anterior
      ],
    ],

    // El asunto del commit (la descripción corta) no puede estar vacío
    'subject-empty': [2, 'never'],

    // El asunto no debe terminar con punto
    'subject-full-stop': [2, 'never', '.'],

    // El asunto debe estar en minúsculas
    'subject-case': [2, 'never', ['upper-case', 'pascal-case', 'start-case']],

    // Longitud máxima de la primera línea del commit: 100 caracteres
    'header-max-length': [2, 'always', 100],
  },
};
```

---

## 7. Paso 5 — Inicializar Git y subir a GitHub

### 7.1 — Crear el `.gitignore`

Vite ya crea uno básico, pero vamos a asegurarnos de que esté completo:

```
# Dependencias
node_modules/
.npm

# Build de producción
dist/
build/

# Variables de entorno (NUNCA subir esto)
.env
.env.local
.env.*.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
logs/
*.log

# Editor
.vscode/settings.json
.idea/
*.swp
*.swo
.DS_Store

# OS
Thumbs.db

# Cache de herramientas
.eslintcache
.stylelintcache
```

### 7.2 — Inicializar el repositorio Git

```bash
# Desde la raíz del proyecto:
git init

# Agregar todos los archivos al staging
git add .

# Primer commit
git commit -m "chore: initial project setup with vite react"

# Renombrar la rama actual a 'main' (por si Git la creó como 'master')
git branch -M main
```

### 7.3 — Crear el repositorio en GitHub

1. Ve a https://github.com y haz clic en **New repository**.
2. Nombre del repositorio: `agencia-kleos`
3. Descripción: `Landing page oficial de Agencia Kleos`
4. Visibilidad: **Private** (recomendado mientras esté en desarrollo)
5. **NO** marques "Add a README file", "Add .gitignore" ni "Choose a license". Ya los tenemos.
6. Haz clic en **Create repository**.

### 7.4 — Conectar el proyecto local con GitHub

```bash
# Reemplaza TU_USUARIO con tu nombre de usuario de GitHub
git remote add origin https://github.com/TU_USUARIO/agencia-kleos.git

# Sube la rama main
git push -u origin main
```

### 7.5 — Crear la rama `develop`

```bash
# Crear la rama develop desde main
git checkout -b develop

# Subir develop a GitHub
git push -u origin develop
```

### 7.6 — Proteger las ramas en GitHub

Esto es importante para que nadie pueda hacer push directo a `main` o `develop` por accidente.

1. En GitHub, ve a tu repositorio → **Settings** → **Branches**.
2. Haz clic en **Add branch protection rule**.
3. En "Branch name pattern" escribe `main`.
4. Activa: **Require a pull request before merging**.
5. Activa: **Require approvals** → 1 aprobación.
6. Haz clic en **Create**.
7. Repite el proceso para `develop`.

### 7.7 — Invitar al equipo

1. Ve a tu repositorio en GitHub → **Settings** → **Collaborators**.
2. Haz clic en **Add people** y agrega los correos/usuarios de los otros 3 integrantes.
3. Ellos recibirán un email con la invitación. Una vez aceptada, podrán hacer clone.

### 7.8 — Clonar el proyecto (para los otros 3 integrantes)

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/agencia-kleos.git

# 2. Entrar a la carpeta
cd agencia-kleos

# 3. Instalar dependencias (esto también activa Husky automáticamente por el script 'prepare')
npm install

# 4. Cambiar a la rama develop (la rama de trabajo diario)
git checkout develop

# 5. Verificar que todo funciona
npm run dev
```

---

## 8. Paso 6 — Flujo de trabajo en equipo (Git Workflow)

Usamos una versión simplificada de **Git Flow** adaptada para equipos pequeños.

### Diagrama de ramas

```
main          ──────────────●──────────────────────────●──────
                            ↑ merge + tag v1.0          ↑ merge + tag v1.1
                            │                           │
develop       ──────●───────●───────●───────────────────●──────
                    ↑       ↑       ↑
                    │       │       └── merge feat/contact-form
                    │       └────────── merge feat/hero-section
                    └────────────────── merge feat/navbar
                    
feat/navbar   ──────●───●───●
feat/hero     ──────────────●───●───●
feat/contact  ────────────────────────●───●
```

### Las 3 reglas del flujo:

1. **`main`** — Solo código en producción, estable y probado. Nadie hace push directo. Solo recibe merges desde `develop` cuando hay una versión lista para publicar.
2. **`develop`** — Rama de integración y pruebas. Aquí se mergean las features completadas. Nadie trabaja directamente aquí.
3. **`feat/nombre-de-la-feature`** — Donde cada integrante trabaja. Se crea desde `develop` y se mergea de vuelta a `develop` vía Pull Request.

### Flujo de trabajo diario paso a paso:

```bash
# 1. Antes de empezar a trabajar, actualiza develop
git checkout develop
git pull origin develop

# 2. Crea tu rama de feature
# Nomenclatura: feat/descripcion-corta (siempre en inglés, kebab-case)
git checkout -b feat/hero-section

# 3. Trabaja en tu feature. Haz commits frecuentes.
git add .
git commit -m "feat(hero): add hero section layout"

git add .
git commit -m "feat(hero): add animated headline text"

# 4. Cuando termines, actualiza tu rama con los últimos cambios de develop
# (por si alguien más mergeó algo mientras trabajabas)
git fetch origin
git rebase origin/develop
# Si hay conflictos, resuélvelos, luego: git add . && git rebase --continue

# 5. Sube tu rama a GitHub
git push origin feat/hero-section

# 6. En GitHub, crea un Pull Request:
#    - Base: develop
#    - Compare: feat/hero-section
#    - Descripción: qué hace, qué probaste, capturas de pantalla si aplica
#    - Asigna a un compañero para revisión

# 7. Otro integrante revisa el PR y lo aprueba (o pide cambios)

# 8. Una vez aprobado, se hace merge a develop

# 9. Elimina la rama local y remota (ya no la necesitas)
git checkout develop
git pull origin develop
git branch -d feat/hero-section
git push origin --delete feat/hero-section
```

### Convención de nombres de ramas:

| Prefijo | Uso | Ejemplo |
|---|---|---|
| `feat/` | Nueva funcionalidad | `feat/navbar`, `feat/contact-form` |
| `fix/` | Corrección de error | `fix/mobile-menu-overflow` |
| `docs/` | Solo documentación | `docs/update-readme` |
| `style/` | Solo estilos CSS | `style/typography-refinement` |
| `refactor/` | Refactorización | `refactor/hero-component` |
| `chore/` | Mantenimiento | `chore/update-dependencies` |

### Template para Pull Requests

Crea el archivo `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
## ¿Qué hace este PR?

<!-- Describe brevemente los cambios -->

## Tipo de cambio

- [ ] 🆕 Nueva funcionalidad (feat)
- [ ] 🐛 Corrección de error (fix)
- [ ] 📝 Documentación (docs)
- [ ] 💄 Estilos (style)
- [ ] ♻️ Refactorización (refactor)

## ¿Cómo probarlo?

<!-- Pasos para que el revisor pruebe los cambios -->
1. 
2. 

## Capturas de pantalla (si aplica)

<!-- Agrega capturas del antes/después si hay cambios visuales -->

## Checklist

- [ ] El código sigue las convenciones del proyecto
- [ ] No hay errores de ESLint (`npm run lint`)
- [ ] El sitio se ve bien en mobile y desktop
- [ ] Los commits siguen Conventional Commits
```

---

## 9. Paso 7 — Convención de Commits (Conventional Commits)

El estándar **Conventional Commits** da estructura a los mensajes de commit para que sean legibles por humanos y máquinas. Permite generar changelogs automáticos y entender el historial de cambios fácilmente.

### Formato

```
<tipo>(<ámbito opcional>): <descripción corta>

[cuerpo opcional]

[notas de pie opcionales]
```

### Tipos permitidos

| Tipo | Cuándo usarlo | Ejemplo |
|---|---|---|
| `feat` | Añades algo nuevo que el usuario verá | `feat(hero): add animated headline` |
| `fix` | Corriges un bug | `fix(navbar): mobile menu not closing` |
| `docs` | Solo cambios en documentación | `docs: update installation steps` |
| `style` | Formato de código (espacios, comas) sin cambiar lógica | `style: fix indentation in App.jsx` |
| `refactor` | Reorganizas código sin cambiar funcionalidad | `refactor(hero): extract animations to hook` |
| `perf` | Mejoras de rendimiento | `perf: lazy load portfolio images` |
| `test` | Añadir o modificar tests | `test: add Hero snapshot test` |
| `build` | Cambios en Vite, package.json, dependencias | `build: upgrade react to 18.3.0` |
| `chore` | Tareas de mantenimiento que no tocan código de producción | `chore: update eslint config` |
| `revert` | Revertir un commit anterior | `revert: revert "feat(hero): add animation"` |

### Ámbitos sugeridos (scope)

Los ámbitos son opcionales pero recomendados para este proyecto:

`hero` | `navbar` | `footer` | `about` | `services` | `portfolio` | `contact` | `layout` | `styles` | `deps` | `config`

### Ejemplos de commits correctos

```bash
git commit -m "feat(navbar): add sticky navigation with scroll detection"
git commit -m "fix(contact): fix form validation not triggering on submit"
git commit -m "style(hero): adjust headline font size for mobile"
git commit -m "chore(deps): update vite to 5.2.0"
git commit -m "docs: add deployment instructions to README"
git commit -m "refactor(layout): extract Navbar to separate component"
```

### Ejemplos de commits INCORRECTOS (serán rechazados por commitlint)

```bash
git commit -m "arreglé el navbar"        # ❌ No sigue el formato
git commit -m "Fix"                       # ❌ Sin descripción
git commit -m "FEAT: new hero section"   # ❌ Tipo en mayúsculas
git commit -m "feat: New hero section."  # ❌ Comienza con mayúscula y termina con punto
```

---

## 10. Paso 8 — Configurar y desplegar en Hostinger

### Arquitectura de despliegue

```
GitHub (main branch)
       │
       │  git push
       ▼
Hostinger (Node.js hosting)
  - npm install
  - npm run build  →  genera carpeta dist/
  - npm start      →  server.js sirve dist/ con Express
       │
       ▼
  Usuario visita agenciakleos.com
```

### 10.1 — Crear el servidor Express

Este servidor es la "puerta de entrada" en Hostinger. Sirve los archivos estáticos del build de React.

Crea `server.js` en la raíz del proyecto:

```js
// server.js
// Servidor Express mínimo para servir el build de React en Hostinger.
// Hostinger con Node.js necesita un archivo de entrada que "escuche" un puerto.
// React con Vite genera una Single Page Application (SPA), así que todas las rutas
// deben devolver el index.html y React maneja el routing del lado del cliente.

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// En ESModules no existe __dirname, así que lo reconstruimos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Puerto: Hostinger inyecta la variable de entorno PORT automáticamente.
// Si no existe (entorno local), usamos 3000.
const PORT = process.env.PORT || 3000;

// Servir los archivos estáticos del build de Vite (carpeta dist/)
app.use(express.static(join(__dirname, 'dist')));

// SPA fallback: cualquier ruta que no sea un archivo estático devuelve index.html
// Esto permite que React Router (si se usa en el futuro) funcione correctamente
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Servidor Agencia Kleos corriendo en puerto ${PORT}`);
});
```

### 10.2 — Actualizar `package.json` para producción

Asegúrate de que tu `package.json` tenga:

```json
{
  "name": "agencia-kleos",
  "version": "1.0.0",
  "type": "module",
  "engines": {
    "node": ">=20.0.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "node server.js",
    "lint": "eslint src --ext .js,.jsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint src --ext .js,.jsx --fix",
    "format": "prettier --write 'src/**/*.{js,jsx,css}'",
    "format:check": "prettier --check 'src/**/*.{js,jsx,css}'"
  }
}
```

**Puntos clave:**
- `"type": "module"` — El proyecto usa ESModules (import/export). Vite lo configura así.
- `"engines"` — Le dice a Hostinger qué versión de Node requiere.
- `"start": "node server.js"` — Hostinger ejecutará este comando para arrancar la app.

### 10.3 — Agregar Express como dependencia de producción

```bash
# Express va en dependencies (no devDependencies) porque se necesita en producción
npm install express
```

### 10.4 — Crear archivo `.nvmrc`

Este archivo le dice a Hostinger (y a tu equipo) qué versión de Node usar:

```bash
echo "20" > .nvmrc
```

### 10.5 — Configurar `vite.config.js`

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(), // Habilita JSX, Fast Refresh y optimizaciones de React
  ],

  resolve: {
    alias: {
      // Alias @ para importar desde src/ sin rutas relativas largas
      // En lugar de '../../components/Button' puedes escribir '@/components/Button'
      '@': resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',        // Carpeta de salida del build
    sourcemap: false,       // No generar sourcemaps en producción (más seguro y más liviano)
    minify: 'esbuild',      // esbuild es el minificador más rápido (viene incluido en Vite)
    rollupOptions: {
      output: {
        // Dividir el bundle en chunks para mejor caché del navegador
        // Vite 8 requiere función en lugar de objeto para manualChunks
        manualChunks: (id) => {
          if (id.includes('react') || id.includes('react-dom')) {
            return 'vendor'; // React va en su propio chunk separado
          }
        },
      },
    },
  },

  server: {
    port: 5173,   // Puerto del servidor de desarrollo
    open: true,   // Abre el navegador automáticamente al correr npm run dev
  },
});
```

### 10.6 — Pasos en el panel de Hostinger

1. **Accede** a hpanel.hostinger.com → tu hosting → **Sitios web**.
2. Haz clic en **Administrar** en tu dominio.
3. Ve a **Avanzado** → **Node.js**.
4. Configura:
   - **Versión de Node.js:** `20.x`
   - **Modo de la aplicación:** `Production`
   - **Punto de entrada de la aplicación:** `server.js`
   - **Directorio raíz de la aplicación:** `/` (raíz del proyecto)
5. Haz clic en **Guardar**.

### 10.7 — Subir el código a Hostinger vía Git

**Opción A: Git en Hostinger (recomendado)**

Hostinger permite conectar directamente con GitHub:

1. En el panel de Hostinger → **Git** → **Crear repositorio Git**.
2. Conecta tu cuenta de GitHub.
3. Selecciona el repositorio `agencia-kleos` y la rama `main`.
4. En **Comandos de despliegue (Deploy commands)**, escribe:
   ```
   npm install
   npm run build
   ```
5. Haz clic en **Guardar y desplegar**.

A partir de este momento, cada vez que hagas push a `main`, Hostinger hará el deploy automáticamente.

**Opción B: FTP/SSH manual**

Si prefieres controlar cuándo desplegar:

```bash
# En tu computadora, genera el build
npm run build

# Sube la carpeta dist/, server.js y package.json a Hostinger vía SSH o FTP
# Luego en Hostinger, ejecuta:
npm install --production
```

---

## 11. Paso 9 — Variables de entorno

Si el proyecto necesita API keys o configuraciones que cambían entre desarrollo y producción:

### En desarrollo (local):

Crea un archivo `.env.local` (ya está en `.gitignore`, nunca se sube a GitHub):

```env
VITE_API_URL=http://localhost:3001
VITE_CONTACT_EMAIL=info@agenciakleos.com
```

**Importante:** En Vite, todas las variables de entorno que quieras usar en el código de React deben empezar con `VITE_`. Las que no empiecen con `VITE_` solo son accesibles en Node.js (server.js).

En tu código React:
```js
const apiUrl = import.meta.env.VITE_API_URL;
```

### En producción (Hostinger):

1. En el panel de Hostinger → **Avanzado** → **Variables de entorno** (o en la configuración de Node.js).
2. Agrega las mismas variables con sus valores de producción.

---

## 12. Archivos de configuración explicados línea a línea

### `index.html` (raíz del proyecto)

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- SEO básico -->
    <meta name="description" content="Agencia Kleos - [Tu descripción aquí]" />
    <title>Agencia Kleos</title>
  </head>
  <body>
    <!-- Aquí React monta toda la aplicación -->
    <div id="root"></div>
    <!-- Vite inyecta el script del bundle aquí automáticamente -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### `src/main.jsx`

```jsx
// Punto de entrada de React.
// ReactDOM.createRoot es la API moderna de React 18 (reemplaza ReactDOM.render de React 17).
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css'; // Importa estilos globales antes de cualquier componente
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  // StrictMode activa advertencias adicionales en desarrollo (sin efecto en producción)
  <StrictMode>
    <App />
  </StrictMode>
);
```

### `src/App.jsx`

```jsx
// Componente raíz. Aquí van los providers globales (si usas Context, Router, etc.)
// y la estructura principal de la app.
import Layout from './layout/Layout';
import Home from './pages/Home';

function App() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export default App;
```

---

## 13. Comandos rápidos del día a día

```bash
# ── DESARROLLO ──────────────────────────────────────
npm run dev              # Inicia el servidor de desarrollo en http://localhost:5173

# ── CALIDAD DE CÓDIGO ────────────────────────────────
npm run lint             # Verifica errores de ESLint (solo muestra, no corrige)
npm run lint:fix         # Verifica y CORRIGE automáticamente errores de ESLint
npm run format           # Formatea TODOS los archivos con Prettier
npm run format:check     # Verifica si hay archivos sin formatear (sin modificar)

# ── BUILD ────────────────────────────────────────────
npm run build            # Genera el build de producción en carpeta dist/
npm run preview          # Sirve el build localmente para revisarlo antes de subir

# ── SERVIDOR PRODUCCIÓN ──────────────────────────────
npm start                # Corre server.js (como lo hace Hostinger)

# ── GIT DIARIO ───────────────────────────────────────
git status               # Ver qué archivos cambiaron
git diff                 # Ver los cambios en detalle
git add .                # Agregar todos los cambios al staging
git add src/components/  # Agregar solo una carpeta específica
git commit -m "feat(hero): add hero section"   # Crear commit
git push origin feat/mi-rama                   # Subir rama a GitHub
git pull origin develop  # Bajar los últimos cambios de develop
git log --oneline --graph --all   # Ver historial de commits con árbol de ramas
```

---

## 14. Preguntas frecuentes (FAQ)

**¿Por qué usamos `rebase` en lugar de `merge` al actualizar nuestra feature branch?**

`git rebase origin/develop` reescribe tu historial poniendo tus commits encima de los últimos cambios de develop. Esto produce un historial lineal y limpio. `git merge develop` crea un "merge commit" extra que ensucia el historial. En proyectos profesionales, se prefiere rebase para las feature branches.

**¿Qué hago si Husky no me deja hacer commit?**

Husky bloqueó el commit porque encontró errores. Lee el mensaje de error. Generalmente:
1. Errores de ESLint → corre `npm run lint:fix`
2. Errores de Prettier → corre `npm run format`
3. Mensaje de commit mal formateado → corrige el mensaje siguiendo Conventional Commits

**¿Puedo hacer commit con `--no-verify` para saltarme Husky?**

Técnicamente sí con `git commit --no-verify`. Pero **no lo hagas** a menos que sea una emergencia absoluta. Los hooks existen para proteger la calidad del código del equipo.

**¿Por qué `develop` y no solo `main`?**

`main` es lo que está en producción. `develop` es donde probamos antes de publicar. Si algo se rompe en `develop`, no afecta lo que los usuarios ven. Es una red de seguridad.

**¿Con qué frecuencia debería hacer commits?**

Con mucha frecuencia, pero solo cuando el código funciona. La regla es: un commit = un cambio lógico y funcional. Mejor 10 commits pequeños que 1 commit gigante.

**¿Qué versión de Node debo usar en mi computadora si ya tenía otra?**

```bash
nvm install 20
nvm use 20
```

Con nvm puedes tener múltiples versiones y cambiar entre ellas sin conflictos. Si el proyecto tiene `.nvmrc`, puedes correr simplemente `nvm use` y usará la versión especificada.

---

*Documentación creada para el equipo de Agencia Kleos. Última actualización: Mayo 2026.*