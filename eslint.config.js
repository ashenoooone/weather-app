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

      // 2_pages — композиция страниц; routes/* tanstack-router тоже считаем pages
      { type: 'pages', mode: 'folder', pattern: 'src/2_pages/*', capture: ['page'] },
      { type: 'pages', mode: 'full', pattern: 'src/routes/**/*' },

      // 3_features — пользовательские сценарии (срез на 1 уровень)
      { type: 'features', mode: 'folder', pattern: 'src/3_features/*', capture: ['feature'] },

      // 4_entities — доменные сущности (срез на 1 уровень)
      { type: 'entities', mode: 'folder', pattern: 'src/4_entities/*', capture: ['entity'] },

      // 5_shared — инфраструктура и общий код
      // интеграции, глобальные стили и прочая cross-cutting обвязка
      { type: 'shared', mode: 'full', pattern: 'src/5_shared/**/*' },
      { type: 'shared', mode: 'full', pattern: 'src/5_shared/integrations/**/*' },
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
        // 5_shared — самый нижний слой, может зависеть только от себя
        {
          from: { type: 'shared' },
          allow: [{ to: { type: 'shared' } }],
        },

        // 4_entities — могут зависеть от shared и других entities
        {
          from: { type: 'entities' },
          allow: [{ to: { type: ['shared', 'entities'] } }],
        },

        // 3_features — могут использовать entities и shared
        // cross-feature импорты запрещены
        {
          from: { type: 'features' },
          allow: [{ to: { type: ['shared', 'entities'] } }],
        },

        // 2_pages — тонкий слой композиции из features/entities/shared
        {
          from: { type: 'pages' },
          allow: [{ to: { type: ['shared', 'entities', 'features'] } }],
        },

        // 1_app — только bootstrap; подключает feature через pages,
        // отсюда разрешены pages и shared (без прямых импортов features/entities)
        {
          from: { type: 'app' },
          allow: [{ to: { type: ['shared', 'pages', 'app'] } }],
        },
      ],
    }],
  },
})
