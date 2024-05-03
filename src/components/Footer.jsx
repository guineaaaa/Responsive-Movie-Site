import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #0a0a5c;
  color: white;
  padding: 10px;
  text-align: right;
  width: 100%;
  position: fixed;
  bottom: 0;
  right: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      &copy; UMCFooter
    </FooterContainer>
  );
};

export default Footer;
