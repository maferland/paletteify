import {Color} from '../pages'
import styled from '@emotion/styled'
import * as React from 'react'

type PaletteProps = {
  palette: Color[]
}

type PaletteColorProps = {
  code: string
}

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2em;
`
const Cell = styled.div`
  height: 150px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30%;
  margin: 1em;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
  cursor: pointer;

  span {
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
    font-family: monospace;
    font-size: 2em;
  }

  :hover {
    span {
      opacity: 1;
    }
  }
`

function PaletteColor({code}: PaletteColorProps) {
  const [text, setText] = React.useState(code)

  function handleClick() {
    navigator.clipboard.writeText(code).then(
      function () {
        setText('Copied!')
        setTimeout(() => {
          setText(code)
        }, 3000)
      },
      function () {
        /* clipboard write failed */
      },
    )
  }
  return (
    <Cell style={{background: code}} onClick={handleClick}>
      <span>{text}</span>
    </Cell>
  )
}

export default function Palette({palette}: PaletteProps) {
  if (palette.length === 0) {
    return <span />
  }

  return (
    <Grid>
      {palette.map(({name, code}) => (
        <PaletteColor code={code} key={name} />
      ))}
    </Grid>
  )
}
