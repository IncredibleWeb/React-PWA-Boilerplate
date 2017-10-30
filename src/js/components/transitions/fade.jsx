import React from "react";
import { CSSTransition } from "react-transition-group";

export const FadeTransition = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={200} classNames="fade">
    {children}
  </CSSTransition>
);

export default FadeTransition;
