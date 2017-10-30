import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Card = ({ title, html, buttons }) => {
  return (
    <section className="richtext card">
      <div className="card-title">
        <h1>{title}</h1>
      </div>
      <div
        className="card-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {buttons && (
        <div className="card-buttons">
          {buttons.map((n, index) => (
            <Link
              to={n.url}
              key={index}
              href={n.url}
              className="button"
              title={n.title}
            >
              {n.title}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  html: PropTypes.string,
  buttons: PropTypes.array
};

export default Card;
