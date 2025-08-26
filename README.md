
# Next.js 보일러 플레이트 만들기
```
Typescript
ReactJS + Next.js
TailwindCss + LucidReact + Shardcn
```
```
next-starter
├─ .npmrc
├─ .nvmrc
├─ .prettierignore
├─ .prettierrc
├─ README.md
├─ components.json
├─ eslint.config.mjs
├─ next.config.ts
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.mjs
├─ public
├─ src
│  ├─ app
│  │  ├─ dashboard
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components
│  │  └─ ui
│  ├─ hooks
│  └─ lib
└─ tsconfig.json
```
 
--- 

## Getting Started

### 0. pnpm 설치 
```
npm install -g pnpm
```
### 1. Next.js 프로젝트 생성
작업공간을 만들고 원하는 폴더 또는 명령어 입력하여 프로젝트 명 입력하여 생성가능

```
# 여기서는 원하는 폴더를 만들고 해당 폴더에서 Next 앱을 생성함.
pnpm dlx create-next-app@latest .
```

```
? Would you like to use TypeScript? › Yes
? Which linter would you like to use? > ESLint
? Would you like to use Tailwind CSS? > Yes
? Would you like your code inside a `src/` directory? > Yes
? Would you like to use App Router? > Yes
? Would you like to use Turbopack? (recommended) > No
? Would you like to customize the import alias (`@/*` by default)? > No
```

### 2. .nvmrcn 파일 생성
.nvmrc 파일에 특정 버전(예: v22)을 명시해두면, NVM을 사용하는 개발자가 <code>nvm use</code> 명령어를 실행하면 파일에 지정된 버전으로 Node.js 버전이 전환 됨
```
echo "v22" > .nvmrc
```

### 2-1. pnpm hoisting setting (for eslint)
```
echo "public-hoist-pattern[]=*eslint*" > .npmrc
```

### 3. prettier & eslint setting
- prettier : 개발자마다 다른 코드 스타일을 사용해 발생하는 혼란을 줄이고, 코드 가독성을 높임
- eslint-config-prettier : ESLint와 Prettier를 함께 사용할 때 발생하는 충돌을 해결하기 위한 설정 패키지
- <code>-D</code> 옵션은 이 패키지들을 개발 과정에서만 사용된다는 것을 명시함.
```
pnpm add -D prettier eslint-config-prettier 
```

### 3-1. prettier-plugin-sort-imports
import 문을 알파벳순이나 그룹별로 깔끔하게 정리하는 기능을 Prettier에 추가하여, 코드 가독성을 높이고 협업 시 코드 스타일을 통일하는 데 사용
```
pnpm add -D @trivago/prettier-plugin-sort-imports
```

### 3-2. .prettierrc 파일 생성 (root 위치에)
이 파일은 Prettier가 프로젝트의 코드를 어떤 규칙에 따라 정렬하고 포맷팅할지 정의하는 데 사용되며 개발자 개개인의 코드 스타일이 아닌, 프로젝트 전체에 적용되는 통일된 코드 스타일을 강제할 때 매우 유용함.
```
{
  "singleQuote": true,
  "jsxSingleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "es5",
  "parser": "typescript",
  "plugins": ["@trivago/prettier-plugin-sort-imports"],
  "importOrder": [
    "^next$",
    "^next/\\w*$",
    "^next/(.*)$",	
    "^react$",
    "^react/(.*)$",
    "^lucide-react$",
    "^@/lib/(.*)$",
	"^@/components/(.*)$",
    "^[./]"
  ]
}
```

### 3-3. .prettierignore 파일 생성 (root 위치에)
이 파일에 나열된 경로에 있는 파일들은 Prettier의 포맷팅 대상에서 제외됨. 이는 불필요한 파일 포맷팅을 막고, 빌드 프로세스나 기타 도구에 의해 자동 생성된 파일을 보호하는 데 중요함.
```
# Markdown 파일 제외
*.md
*.css

# 이미지, JSON, log 제외
*.png
*.jpg
*.json
*.log
*.ico
*.svg

# node_modules와 빌드 폴더 제외
node_modules
dist
build
LICENSE

.*
*.sql
*.yaml
*.yml
*.json
*.prisma
```

### 3-4. eslint.config.mjs 파일을 아래 내용으로 수정
```
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {},
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ]
  }),
]

export default eslintConfig

```


### 4. package.json에 format script 걸기 
```
"format": "prettier --write ."
```
<code>scripts</code> 에 추가합니다.
```
...
"scripts": {
    "dev": "next dev",
    ...
    "format": "prettier --write ."
  }
...
```


### 5. 새롭게 pnpm 으로 설치
```
pnpm install
```
```
? The modules directory at "/home/seoik/workspace/ydp-sesac/sbm2025/node_modules" will be removed and reinstalled from scratch. Proceed? > true
```

### 5-1. dotenv-cli 설치
env 파일에 있는 환경 변수를 커맨드 라인에서 쉽게 사용할 수 있도록 도와주는 도구를 설치
```
pnpm add -D dotenv-cli
```

### 6. shadcn 설치
shadcn/ui는 흔히 사용되는 UI 컴포넌트 라이브러리로, 특히 React와 Tailwind CSS 기반의 프로젝트에서 많이 사용함
```
pnpm dlx shadcn@latest init
```
```
? Which color would you like to use as the base color? > Neutral
```

### 6-1. shadcn 의 특정 UI컴포넌트 (dashboard-01)을 추가
dashboard-01을 구성하는 모든 React 및 Tailwind CSS 코드가 자동으로 프로젝트의 components.json 설정 파일에 지정된 디렉터리(components/ui 등)로 추가함.
https://ui.shadcn.com/view/dashboard-01
```
pnpx shadcn@latest add dashboard-01
```

### 7. 테마(Dark/Light)
<code>next-themes</code>는 Next.js 애플리케이션에서 다크 모드와 라이트 모드를 포함한 테마 관리 기능을 간편하게 구현하기 위해 사용
```
pnpm add next-themes
```

### 7-1. components/theme-provider.tsx 생성
```
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ComponentProps } from 'react';

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### 7-2. app/layout.tsx 파일에 테마 프로바이더 추가
<code>{children}</code> 위에 작성
```
<ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
  ...
</ThemeProvider>
```

### 7-3. components/theme-changer.tsx 생성
```
import { useTheme } from 'next-themes';
const THEMES = ['light', 'system', 'dark'];
const { theme, setTheme } = useTheme();
```