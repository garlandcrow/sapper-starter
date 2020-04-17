import { action } from '@storybook/addon-actions'
import Nav from './Nav.svelte'

export default {
  title: 'Nav',
  component: Nav,
}

export const Default = () => ({
  Component: Nav,
  props: { text: 'Hello Button' },
  on: { click: action('clicked') },
})
