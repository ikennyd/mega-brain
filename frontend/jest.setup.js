import '@testing-library/jest-dom'

// Mock next/themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }) => children,
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
    mounted: true,
  }),
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}))

// Suppress console errors in tests
global.console.error = jest.fn()
global.console.warn = jest.fn()
