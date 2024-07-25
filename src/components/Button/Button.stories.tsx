import { Button } from './Button'

export default {
  title: 'Components/Button'
}

export const Example = () => {
  return <Button>Click me</Button>
}

export const Option = () => {
  return (
    <>
      <Button>W</Button>
      <Button>I</Button>
    </>
  )
}
