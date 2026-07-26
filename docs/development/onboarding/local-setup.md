# React + Vite Frontend Development Setup Guide

## Clean and modern setup for a React + Vite frontend

### Local setup required for seamless development

1. Add ESLint + Prettier integration.
2. Enable ESLint auto-fix on save.
3. Add better VS Code language formatting support.
4. Fix the Vite Tailwind import naming.
5. Keep your existing dependency choices.

Below are the files that will help you to setup the project.

---

# 1. `frontend/.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },

  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

# 2. `frontend/.editorconfig`

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
```

---

# 3. `frontend/.prettierignore`

```text
node_modules
dist
coverage
.vscode
```

---

# 4. `frontend/.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "plugins": [
    "prettier-plugin-tailwindcss"
  ]
}
```

---

# 5. `frontend/eslint.config.js`

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),

  {
    files: ['**/*.{js,jsx}'],

    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettierConfig,
    ],

    languageOptions: {
      globals: globals.browser,

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },

    rules: {
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],
    },
  },
])
```

---

# 6. `frontend/package.json`

Update the **scripts** section as follows:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

**No dependency changes are required.**

---

# 7. `frontend/vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

---

# 8. Final frontend structure

Your final structure should be:

```text
algo-arena
├── backend
│   └── .gitkeep
│
├── frontend
│   ├── .vscode
│   │   └── settings.json
│   │
│   ├── public
│   │
│   ├── src
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .editorconfig
│   ├── .gitkeep
│   ├── .prettierignore
│   ├── .prettierrc
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore
```

---

# Development Workflow

After these changes, your development workflow will be:

```text
Write JSX/CSS
      ↓
Save file
      ↓
ESLint auto-fixes issues
      ↓
Prettier formats code
      ↓
Tailwind classes are sorted
      ↓
Clean consistent code
```

**No manual formatting commands are required during normal development.**

---

# Recommended VS Code Extensions

Below are the **official VS Code extension names and publishers** for the extensions listed above. You can search these exact names in the VS Code Extensions Marketplace.

| #  | Official Extension Name                    | Publisher                |
| -- | ------------------------------------------ | ------------------------ |
| 1  | **Prettier - Code formatter**              | **Prettier**             |
| 2  | **ESLint**                                 | **Microsoft**            |
| 3  | **Tailwind CSS IntelliSense**              | **Tailwind Labs**        |
| 4  | **ES7+ React/Redux/React-Native snippets** | **dsznajder**            |
| 5  | **Error Lens**                             | **Alexander**            |
| 6  | **Auto Rename Tag**                        | **Jun Han**              |
| 7  | **Path Intellisense**                      | **Christian Kohler**     |
| 8  | **Material Icon Theme**                    | **Philipp Kief**         |
| 9  | **GitLens — Git supercharged**             | **GitKraken**            |
| 10 | **Thunder Client**                         | **Thunder Client**       |
| 11 | **DotENV**                                 | **mikestead**            |
| 12 | **Markdown All in One**                    | **Yu Zhang**             |
| 13 | **Better Comments**                        | **Aaron Bond**           |
| 14 | **Console Ninja**                          | **Wallaby.js**           |
| 15 | **Code Spell Checker**                     | **Street Side Software** |

---

# Recommended installation order for AlgoArena frontend

## Core React Development

Install these first:

1. **Prettier - Code formatter**
   Publisher: `Prettier`

2. **ESLint**
   Publisher: `Microsoft`

3. **Tailwind CSS IntelliSense**
   Publisher: `Tailwind Labs`

4. **ES7+ React/Redux/React-Native snippets**
   Publisher: `dsznajder`

---

## Productivity Boosters

1. **Error Lens**
   Publisher: `Alexander`

2. **Auto Rename Tag**
   Publisher: `Jun Han`

3. **Path Intellisense**
   Publisher: `Christian Kohler`

4. **Material Icon Theme**
   Publisher: `Philipp Kief`

---

## Project Management / Backend Integration

1. **GitLens — Git supercharged**
   Publisher: `GitKraken`

2. **Thunder Client**
   Publisher: `Thunder Client`

3. **DotENV**
   Publisher: `mikestead`

---

## Documentation

1. **Markdown All in One**
   Publisher: `Yu Zhang`

2. **Better Comments**
   Publisher: `Aaron Bond`

---

## Debugging / Quality

1. **Console Ninja**
   Publisher: `Wallaby.js`

2. **Code Spell Checker**
   Publisher: `Street Side Software`

---

# Recommendation

For this specific stack (**React + Vite + Tailwind CSS 4 + TanStack Query + Zustand + ASP.NET Core Web API**), the first **10 extensions** are the ones that will provide the biggest improvement. The remaining ones improve comfort and long-term maintainability as the project grows.
