import './Button.css'
import { DetailedHTMLProps } from 'react'

type ButtonProps =
  DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    disabled?: boolean
    onClick?: () => void
  }

export function Button (props: ButtonProps) {
  const { children, disabled, onClick } = props

  return (
    <button
      className='button'
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
