import antfu from '@antfu/eslint-config'

import boundaries from 'eslint-plugin-boundaries'

export default antfu({
  react: true,
  typescript: true,
  formatters: {
    css: true,
  },
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },
  ignores: ['src/routeTree.gen.ts', 'README.md'],
}, {
  rules: {
    'react-refresh/only-export-components': 'off',
    'curly': ['error', 'all'],
    'style/brace-style': ['error', 'stroustrup'],
    'ts/consistent-type-definitions': ['error', 'type'],
    'perfectionist/sort-imports': 'off',
    'perfectionist/sort-named-imports': ['off'],
    'e18e/ban-dependencies': ['off'],
  },
}, {
  files: ['src/**/*.{ts,tsx}'],
  plugins: { boundaries },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: true,
    },
    'boundaries/include': ['src/**/*'],
    'boundaries/ignore': [
      '**/*.test.{ts,tsx}',
      '**/*.spec.{ts,tsx}',
    ],
    'boundaries/elements': [
      // 1_app — только bootstrap (main.tsx, router, app-level providers)
      { type: 'app', mode: 'full', pattern: 'src/1_app/**/*' },
      { type: 'app', mode: 'full', pattern: 'src/1_app/router.{ts,tsx}' },

      // routes/* tanstack-router относим к app-слою
      { type: 'app', mode: 'full', pattern: 'src/routes/**/*' },

      // 2_features — пользовательские сценарии (срез на 1 уровень)
      { type: 'features', mode: 'folder', pattern: 'src/2_features/*', capture: ['feature'] },

      // 3_entities — доменные сущности (срез на 1 уровень)
      { type: 'entities', mode: 'folder', pattern: 'src/3_entities/*', capture: ['entity'] },

      // 4_shared — инфраструктура и общий код
      // интеграции, глобальные стили и прочая cross-cutting обвязка
      { type: 'shared', mode: 'full', pattern: 'src/4_shared/**/*' },
      { type: 'shared', mode: 'full', pattern: 'src/4_shared/integrations/**/*' },
      { type: 'shared', mode: 'full', pattern: 'src/styles.css' },
      { type: 'shared', mode: 'full', pattern: 'src/routeTree.gen.{ts,tsx}' },
    ],
  },
  rules: {
    // оставляем выключенными: проект может содержать сгенерированные/служебные
    // файлы (например, routeTree.gen.ts), которые не вписываются в слои
    'boundaries/no-unknown': 'off',
    'boundaries/no-unknown-files': 'off',
    'boundaries/no-private': 'off',
    'boundaries/dependencies': ['error', {
      default: 'disallow',
      rules: [
        // 4_shared — самый нижний слой, может зависеть только от себя
        {
          from: { type: 'shared' },
          allow: [{ to: { type: 'shared' } }],
        },

        // 3_entities — могут зависеть от shared и других entities
        {
          from: { type: 'entities' },
          allow: [{ to: { type: ['shared', 'entities'] } }],
        },

        // 2_features — могут использовать entities и shared
        // cross-feature импорты запрещены
        {
          from: { type: 'features' },
          allow: [{ to: { type: ['shared', 'entities'] } }],
        },

        // 1_app — bootstrap + routes, композиция из feature/entity/shared
        {
          from: { type: 'app' },
          allow: [{ to: { type: ['shared', 'entities', 'features', 'app'] } }],
        },
      ],
    }],
  },
})
