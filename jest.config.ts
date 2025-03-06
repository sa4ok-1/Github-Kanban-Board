module.exports = {
  testEnvironment: 'jsdom', // Для тестування React-компонентів у браузерному оточенні
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Трансформація TypeScript файлів
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios|msw)', // Дозволяємо трансформувати axios і msw
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Для обробки стилів
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Для додаткових налаштувань, наприклад, @testing-library/jest-dom
};