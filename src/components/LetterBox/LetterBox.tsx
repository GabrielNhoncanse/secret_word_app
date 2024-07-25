import './LetterBox.css'

type LetterBoxProps = {
  character: string
  display: boolean
}

export function LetterBox (props: LetterBoxProps) {
  const { character, display } = props
  return (
    <div
      className='letter-box'
    >
      <span style={display ? { display: 'block' } : { display: 'none' }}>{character.toUpperCase()}</span>
    </div>
  )
}
