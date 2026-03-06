import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '../Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Vendas Hoje',
    value: 15000,
  },
}

export const WithSubtitle: Story = {
  args: {
    title: 'Total de Clientes',
    value: 1250,
    subtitle: 'Ativos este mês',
  },
}

export const WithBadge: Story = {
  args: {
    title: 'Status do Sistema',
    value: '✓ Online',
    badge: {
      label: 'Ativo',
      color: 'success',
    },
  },
}

export const WithIcon: Story = {
  args: {
    title: 'Crescimento',
    value: '24%',
    icon: '📈',
    badge: {
      label: 'Crescendo',
      color: 'success',
    },
  },
}

export const Loading: Story = {
  args: {
    title: 'Carregando...',
    value: 0,
    loading: true,
  },
}

export const Warning: Story = {
  args: {
    title: 'Itens Pendentes',
    value: 5,
    badge: {
      label: 'Atenção',
      color: 'warning',
    },
  },
}

export const Error: Story = {
  args: {
    title: 'Erros Detectados',
    value: 3,
    badge: {
      label: 'Erro',
      color: 'error',
    },
  },
}
