import React, {isValidElement, useState} from "react";
import styled from "styled-components";

import { COLORS, MARGINS, BORDER_RADIUS } from "../../constants";

export const Contact = () => {

  const blankForm = {name: "", email: "", messageBody: ""}  
  const [formData, setFormData] = useState(blankForm);
  const [enableSubmit, setEnableSubmit] = useState(false)

  const handleChange = (key, value) => {
    // keep a copy of formData, since setFormData() isn't synchronous 
    const newForm = { ...formData, [key]: value }
    setFormData(newForm);
    if (isValid(newForm)){
      setEnableSubmit(true)
    }
  }

  // reject if empty fields or email doensn't include "@"
  const isValid = (data) => {
    if(!data.name || !data.email || !data.messageBody){
      return false;
    }
    if (!data.email.includes('@')){
      return false;
    }
    return true;
  }

  const formSubmit = (ev) => {
    ev.preventDefault();
    ev.target.reset();

    // dummy submit only, just reset form
    // perhaps add a "thanks for contacting" modal, roughly matching cart modal
    setFormData(blankForm)
    setEnableSubmit(false);
  }
 
  return (<Wrapper>
    <HeaderText>Contact us</HeaderText>
    <SubHead>We would love to hear from you</SubHead>
    <Form onSubmit={(ev) => formSubmit(ev)} >
    <Name placeholder={'Name'} onChange={(ev) => handleChange('name', ev.target.value)} />
    <Email placeholder={'Email address'}  onChange={(ev) => handleChange('email', ev.target.value)}/>
    <HowCanWeHelpYou placeholder={'How can we help you?'} onChange={(ev) => handleChange('messageBody', ev.target.value)}/>
    <Button disabled={!enableSubmit}>Send</Button>
    </Form>
    </Wrapper>);
};


const Wrapper = styled.div`
  padding-top: ${MARGINS.mobileTop};
  margin-left: ${MARGINS.mobileSides};
  margin-right: ${MARGINS.mobileSides};
`;

const HeaderText = styled.h1`
  margin-top: 16px;
`;

const SubHead = styled.p`
    margin-top: 16px;
    font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.textarea`
  border-radius: ${BORDER_RADIUS.smallCorner};
  background-color: ${COLORS.whiteBlue};
  border: 1px solid ${COLORS.lightBabyBlue};
  font-size: large;
  height: 2rem;
  margin-top: 20px;
  resize: none; 
  padding-top: 0.25rem;
  padding-left: 5px;

  &:focus {
    outline: none;
    border: 2px solid ${COLORS.babyBlue};
  }
`;

const Name = styled(Input)``;

const Email = styled(Input)``;

const HowCanWeHelpYou = styled(Input)`
  height: 8rem;
`;

const Button = styled.button`
  color: ${props => props.disabled? "lightgrey" : COLORS.babyBlue}     ;
  border: 2px solid ${COLORS.babyBlue};
  border-radius: ${BORDER_RADIUS.mediumCorner};
  font-size: x-large;
  font-weight: 600;
  padding: 10px;
  margin-top: 20px;
  padding: 10px 40px;
  align-self: flex-end;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

`;