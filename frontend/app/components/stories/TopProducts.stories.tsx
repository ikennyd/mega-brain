import type { Meta, StoryObj } from '@storybook/react'
import { TopProducts } from '../TopProducts'

const meta = {
  title: 'Components/TopProducts',
  component: TopProducts,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TopProducts>

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
