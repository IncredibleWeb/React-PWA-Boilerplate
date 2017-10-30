import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const Meta = ({ meta, url }) => {
  let ogImage = <meta property="og:image" content="/img/logo.jpg" />;

  let imageSrc = <link rel="image_src" href="/img/logo.jpg" />;

  if (meta.thumbnail) {
    ogImage = <meta property="og:image" content={meta.thumbnail} />;
    imageSrc = <link rel="image_src" href={meta.thumbnail} />;
  }

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta property="og:title" content={meta.title} />
      <link rel="canonical" value={url} />
      {ogImage}
      {imageSrc}
    </Helmet>
  );
};

Meta.propTypes = {
  meta: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    thumbnail: PropTypes.string
  }).isRequired,
  url: PropTypes.string
};

export default Meta;
