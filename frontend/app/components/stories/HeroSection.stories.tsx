import type { Meta, StoryObj } from '@storybook/react'
import { HeroSection } from '../HeroSection'

const meta = {
  title: 'Components/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeroSection>

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
