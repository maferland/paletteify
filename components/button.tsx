import styled from '@emotion/styled'
import * as React from 'react'
import Loader from './loader'

const ButtonContainer = styled.button`
  border-top-right-radius: 0.2em;
  border-bottom-right-radius: 0.2em;
  outline: none;
  box-shadow: none;
  background: rgba(0, 0, 0, 0.9);
  border: 4px solid transparent;

  @media (max-width: 800px) {
    border-radius: 0.2em;
    margin-top: 0.5em;
  }

  :hover:not(:disabled) {
    border: 4px solid #596b7f;
  }
  :disabled {
    cursor: progress;
  }
`

type ButtonProps = {
  children: React.ReactNode | string
  onClick?: () => any
  loading?: boolean
}

export default function Button({
  children,
  onClick = () => {},
  loading,
}: ButtonProps) {
  return (
    <ButtonContainer disabled={loading} onClick={onClick}>
      {loading && <Loader />}
      <span style={{opacity: loading ? 0 : 1}}>{children}</span>
    </ButtonContainer>
  )
}

export {ButtonContainer}
