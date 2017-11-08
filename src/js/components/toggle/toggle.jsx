import React from "react";
import PropTypes from "prop-types";

const Toggle = ({ id, title, html, onChange, disabled, checked }) => {
  return (
    <label htmlFor={id}>
      <span className="title">{title}</span>
      <div
        className="toggle-description"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="input toggle-input">
        <input
          type="checkbox"
          id={id}
          onChange={onChange}
          disabled={disabled}
          checked={checked}
        />
        <span className="switch" />
        <span className="toggle">&nbsp;</span>
      </div>
    </label>
  );
};

Toggle.propTypes = {
  title: PropTypes.string,
  html: PropTypes.string
};

export default Toggle;
