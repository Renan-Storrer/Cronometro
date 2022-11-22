import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Footer.scss';

function Footer({
  getYear,
}) {
  return (
    <p className="Footer">
      Created by :
      <a href="https://www.linkedin.com/in/renanstorrer/" target="_blank" rel="noreferrer"> Renan Storrer</a>
      <br />
      {getYear}
    </p>
  );
}

Footer.propTypes = {
  getYear: PropTypes.number.isRequired,
};

export default Footer;