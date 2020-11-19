import React from 'react';

import PropTypes from "prop-types";
import Container from '@material-ui/core/Container';



export default function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (

    <Container
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      component='section'
      {...other}
    >
      {(value === index) && children}

    </Container>

  );
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};