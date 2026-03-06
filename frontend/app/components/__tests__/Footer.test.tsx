import { render, screen, waitFor } from '@testing-library/react'
import { Footer } from '../Footer'

describe('Footer Component', () => {
  it('renders footer with branding', () => {
    render(<Footer />)
    expect(screen.getByText('Mega Brain Dashboard')).toBeInTheDocument()
  })

  it('displays sync status', async () => {
    render(<Footer />)
    await waitFor(() => {
      expect(screen.getByText(/Sincronizado|Sincronizando|Erro|Aguardando/)).toBeInTheDocument()
    })
  })

  it('shows current time', async () => {
    render(<Footer />)
    await waitFor(() => {
      expect(screen.getByText(/\d{2}:\d{2}:\d{2}/)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('displays version information', () => {
    render(<Footer />)
    expect(screen.getByText(/v1\.0\.0/)).toBeInTheDocument()
  })

  it('includes footer links', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThanOrEqual(3)
  })

  it('shows copyright notice', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${year}`))).toBeInTheDocument()
  })

  it('renders sync status indicator', () => {
    const { container } = render(<Footer />)
    const statusIndicator = container.querySelector('.relative')
    expect(statusIndicator).toBeInTheDocument()
  })
})
