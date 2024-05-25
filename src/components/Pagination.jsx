import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: -40px;
`;

const Button = styled.button`
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  padding-left:50px;
  padding-right:50px;
  cursor: pointer;
  color: white;
  background: none;
  border: none;
  font-size: 40px;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const CurrentPage=styled.span`
    color:white;
    font-size:30px;
`;

const Pagination = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);

  return (
    <Nav>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </Button>
      <CurrentPage><strong>{page}</strong></CurrentPage>
      <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </Button>
    </Nav>
  );
};

export default Pagination;
