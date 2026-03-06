import { render, screen, waitFor } from '@testing-library/react'
import { Header } from '../Header'

jest.mock('@hooks/index', () => ({
  useTheme: () => ({
    theme: 'light',
    toggle: jest.fn(),
    mounted: true,
  }),
}))

describe('Header Component', () => {
  it('renders logo and title', () => {
    render(<Header />)
    expect(screen.getByText('Mega Brain')).toBeInTheDocument()
  })

  it('displays current date', () => {
    render(<Header />)
    const dateElements = screen.getAllByText(/\w+/)
    expect(dateElements.length).toBeGreaterThan(0)
  })

  it('shows time clock', async () => {
    render(<Header />)
    await waitFor(() => {
      const timeElements = screen.getAllByText(/\d{2}:\d{2}:\d{2}/)
      expect(timeElements.length).toBeGreaterThan(0)
    }, { timeout: 3000 })
  })

  it('renders theme toggle button', () => {
    render(<Header />)
    const button = screen.getByRole('button', { name: /toggle theme/i })
    expect(button).toBeInTheDocument()
  })

  it('is sticky positioned', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    expect(header).toHaveClass('sticky')
  })
})
