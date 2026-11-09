## Prettier 저장 시 자동 포맷 (VS Code)

이 프로젝트는 저장 시 **Prettier로 포맷**하고,
**ESLint는 자동 수정 가능한 규칙만 적용**합니다.

### 설정

`.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.experimental.useFlatConfig": true
}
```

### 필수 VS Code 확장

- Prettier - Code formatter
- ESLint
