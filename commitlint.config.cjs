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