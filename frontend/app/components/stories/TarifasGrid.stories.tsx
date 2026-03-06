import type { Meta, StoryObj } from '@storybook/react'
import { TarifasGrid } from '../TarifasGrid'

const meta = {
  title: 'Components/TarifasGrid',
  component: TarifasGrid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TarifasGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Loading: Story = {
  decorators: [
    (Story) => (
      <div className="bg-white dark:bg-slate-900 p-8">
        <Story />
      </div>
    ),
  ],
}
