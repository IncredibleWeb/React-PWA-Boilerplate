import React from "react";

// This extends PureComponent instead of functional component because we use ref
export default class Overlay extends React.PureComponent {
  constructor(props) {
    super(props);

    this.addEventListener = this.addEventListener.bind(this);
    this.setVisible = this.setVisible.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  addEventListener(event, callback) {
    this.element.addEventListener(event, e => {
      callback(e);
    });
  }

  setVisible(isVisible) {
    if (isVisible) {
      this.element.classList.remove("hidden");
    } else {
      this.element.classList.add("hidden");
    }
  }

  toggle() {
    // toggle the class 'visible'
    let className = "visible";
    if (this.element.classList) {
      this.element.classList.toggle(className);
    } else {
      let classes = this.element.className.split(" ");
      let existingIndex = classes.indexOf(className);

      if (existingIndex >= 0) {
        classes.splice(existingIndex, 1);
      } else {
        classes.push(className);
      }

      this.element.className = classes.join(" ");
    }
  }

  render() {
    return (
      <div
        id="overlay"
        className="modal-overlay hidden"
        ref={n => (this.element = n)}
      />
    );
  }
}
