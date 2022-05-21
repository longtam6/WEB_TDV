import React from 'react'
//import Textfield from '@atlaskit/textfield'
import Button from '@atlaskit/button'
import styled from 'styled-components'

const ButtonStyled = styled(Button)`
    margin-top: 5px;
    text-align: left;
`;

export default function Todo() {
  return (
    //<Textfield name = "commands" textInput = "abcd"></Textfield>
    <ButtonStyled shouldFitContainer>Item 1</ButtonStyled>
  )
}
