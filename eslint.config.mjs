import tseslint from 'typescript-eslint';
export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', '.next/**'] },
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ['src/automation/**/*.{ts,tsx}', 'src/App.tsx', 'src/main.tsx', 'src/prerender.tsx', 'api/*.ts', 'tests/*.ts'],
  })),
);
