import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavTreeItem = ({ url, name, icon, isActive, onClick }) => {
  const className = isActive ? "selected" : "";
  return (
    <Link to={url} title={name} className={className} onClick={onClick}>
      <i className="icon">{icon && <img src={icon} alt={name} />}</i>
      {name}
    </Link>
  );
};

NavTreeItem.PropTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  icon: PropTypes.string,
  isActive: PropTypes.bool.isRequired
};

export default NavTreeItem;
