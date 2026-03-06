import type { Meta, StoryObj } from '@storybook/react'
import { ChartContainer } from '../ChartContainer'

const meta = {
  title: 'Components/ChartContainer',
  component: ChartContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'radio', options: ['line', 'bar'] },
    },
    title: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof ChartContainer>

export default meta
type Story = StoryObj<typeof meta>

export const LineChart: Story = {
  args: {
    type: 'line',
    title: 'Vendas por Hora',
  },
}

export const BarChart: Story = {
  args: {
    type: 'bar',
    title: 'Pedidos por Hora',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    title: 'Carregando gráfico...',
  },
}
