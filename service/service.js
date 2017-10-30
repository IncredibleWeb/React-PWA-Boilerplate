import pageData from "./pages.json";
import navData from "./nav.json";

export const getPageData = urlPath => {
  return Promise.resolve(pageData[urlPath]);
};

export const getHeaderData = urlPath => {
  return Promise.resolve(navData);
};
