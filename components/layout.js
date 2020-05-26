import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Settings from '../components/settings';

const Container = styled.div`
  text-align: center;
  height: 100vh;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Container>
        <div>{children}</div>
      </Container>

      <Settings />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Layout;
