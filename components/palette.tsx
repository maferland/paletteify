import {Color} from '../pages'
import styled from '@emotion/styled'

type PaletteProps = {
  palette: Color[]
}
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
`

const Cell = styled.div`
  height: 100px;
`

export default function Palette({palette}: PaletteProps) {
  if (palette.length === 0) {
    return <span />
  }
  return (
    <Grid>
      {palette.map(({name, code}) => (
        <Cell key={name} style={{background: code}}>
          {code}
        </Cell>
      ))}
    </Grid>
  )
}
