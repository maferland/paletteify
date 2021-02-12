import {Color} from '../pages'
import styled from '@emotion/styled'
import * as React from 'react'

type PaletteProps = {
  palette: Color[]
  loading: boolean
}

type CellProps = {
  loading: boolean
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
    <CellWrapper>
      <Cell style={{background: code}} onClick={handleClick}>
        <span>{text}</span>
      </Cell>
    </CellWrapper>
  )
}

const GhostCell = styled(Cell)`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`

const CellWrapper = styled.div`
  border: 3px solid transparent;
  border-radius: 30%;
`

function GhostColor({loading}: CellProps) {
  return (
    <CellWrapper
      style={{animation: loading ? 'glow 1.5s ease -in infinite' : undefined}}
    >
      <GhostCell style={{cursor: 'default'}}></GhostCell>
    </CellWrapper>
  )
}

export default function Palette({palette, loading}: PaletteProps) {
  if (palette.length === 0) {
    return (
      <Grid>
        {[0, 1, 2, 3, 4, 5].map((_, index) => (
          <GhostColor key={index} loading={loading} />
        ))}
      </Grid>
    )
  }

  return (
    <Grid>
      {palette.map(({name, code}) => (
        <PaletteColor code={code} key={name} />
      ))}
    </Grid>
  )
}
