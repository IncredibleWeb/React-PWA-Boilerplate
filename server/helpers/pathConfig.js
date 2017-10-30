import fs from "fs";
import path from "path";

// retrieves the contents from a file on the file system
export const getFileContents = (files, folder = "") => {
  // concat inline styles for document <head>
  let flattenedContents = "";
  files.forEach(function(file) {
    flattenedContents += fs.readFileSync(
      path.resolve(__dirname) + folder + file
    );
  });
  return flattenedContents;
};

export const defaultPathConfig = {
  view: "index",
  inlineStyles: getFileContents(
    ["/inline.css"],
    `/../../${process.env.outputFolder}`
  ),
  remoteStyles: [
    "https://fonts.googleapis.com/css?family=Roboto:400,700",
    "/style.css",
    "/vendor.css"
  ],
  vendorScripts: ["/vendor.js"],
  remoteScripts: ["/main.js"]
};
