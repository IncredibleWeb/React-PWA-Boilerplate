import Modernizr from "modernizr";
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import {
  getParameterByName,
  updateQueryStringParameter,
  removeQueryParameter
} from "../../util/util";
import Overlay from "./overlay";
import NavTree from "./navTree";

const menuQueryItem = "_nav";
const swipeSlope = 3; // reciprocal of the swipe slope (1 means 45 deg, 5 means approx 11 deg)

// This extends PureComponent instead of functional component because we use ref
class Nav extends React.PureComponent {
  constructor(props) {
    super(props);

    const { history, onSetNavItemActive } = this.props;

    history.listen((location, action) => {
      onSetNavItemActive({
        href: location.pathname
      });
    });

    this.onLinkClick = this.onLinkClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
    this.updateSlide = this.updateSlide.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const { nav } = this.props;

    return (
      <div>
        <nav className="nav-menu checkbox">
          <div className="hamburger">
            <input
              type="checkbox"
              id="hamburger"
              ref={n => (this.element = n)}
            />
            <label htmlFor="hamburger">Toggle Menu</label>
            <div
              className="side-nav always-open-on-desktop"
              ref={n => (this.sideBarEl = n)}
            >
              <div className="nav-header" />
              <div className="nav-body">
                <div className="section">
                  <NavTree
                    nav={nav}
                    onLinkClick={e => {
                      this.onLinkClick();
                      return true;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Overlay ref={n => (this.overlay = n)} />
      </div>
    );
  }

  init() {
    const self = this;
    self.isVisible = false;
    self.startX = 0;
    self.currentX = 0;
    self.touchingSideNav = false;

    self.element.addEventListener("click", e => {
      // toggle the overlay on click of the burger icon
      self.toggle();
    });

    self.overlay.addEventListener("click", e => {
      self.toggle();
    });

    // handle touch gestures to allow swipe out
    let touchX = 0;
    let touchY = 0;

    document.body.addEventListener(
      "touchstart",
      event => {
        if (!self.isVisible) {
          // slide out
          touchX = event.changedTouches[0].clientX;
          touchY = event.changedTouches[0].clientY;
        } else {
          // slide in/slide animation
          self.startX = event.touches[0].pageX;
          self.currentX = self.startX;
          self.touchingSideNav = true;
          self.sideBarEl.classList.add("touching");
          requestAnimationFrame(() => {
            self.updateSlide(self);
          });
        }
      },
      Modernizr.passiveeventlisteners ? { passive: true } : false
    );

    document.body.addEventListener(
      "touchmove",
      event => {
        if (!self.touchingSideNav) {
          return;
        }
        self.currentX = event.touches[0].pageX;
      },
      Modernizr.passiveeventlisteners ? { passive: true } : false
    );

    document.body.addEventListener(
      "touchend",
      event => {
        if (!self.isVisible) {
          if (self.element.parentElement.parentElement.offsetParent) {
            // calculate the difference
            let x =
              Math.abs(event.changedTouches[0].clientX) - Math.abs(touchX);
            let y =
              Math.abs(event.changedTouches[0].clientY) - Math.abs(touchY);

            if (
              Math.abs(x) > swipeSlope * Math.abs(y) &&
              x > 80 &&
              4 * Math.abs(touchX) < window.innerWidth
            ) {
              // swiped right
              self.toggle();
            }
          }
        } else {
          if (!self.touchingSideNav) {
            return;
          }
          self.touchingSideNav = false;
          self.sideBarEl.classList.remove("touching");

          const translateX = Math.min(0, self.currentX - self.startX);
          self.sideBarEl.style.transform = "";

          // user slided left by more than 1/3 the width of the sidebar
          if (translateX + self.sideBarEl.clientWidth / 3 < 0) {
            self.toggle();
          }
        }
      },
      Modernizr.passiveeventlisteners ? { passive: true } : false
    );

    window.onpopstate = function(event) {
      // user pressed back/forward button
      if (
        !getParameterByName(menuQueryItem, location.search) &&
        self.isVisible
      ) {
        // hide
        self.toggle(true);
      } else if (
        getParameterByName(menuQueryItem, location.search) &&
        !self.isVisible
      ) {
        // show
        self.toggle(true);
      }
    };

    // remove query string params if visible
    window.history.replaceState(
      null,
      "",
      window.location.pathname +
        removeQueryParameter(location.search, menuQueryItem)
    );
  }

  onLinkClick() {
    const self = this;
    // reset the menu
    self.toggle(true);

    // continue event propagation
    return true;
  }

  updateSlide(self) {
    if (!self.touchingSideNav) {
      return;
    }
    requestAnimationFrame(() => {
      self.updateSlide(self);
    });

    const translateX = Math.min(0, self.currentX - self.startX);
    self.sideBarEl.style.transform = `translateX(${translateX}px)`;
  }

  updateHistory() {
    if (!this.isVisible) {
      // hide
      window.history.back();
    } else {
      // show
      window.history.pushState(
        null,
        "",
        updateQueryStringParameter(location.search, menuQueryItem, "1")
      );
    }
  }

  // toggle the overlay and the state of the navigation
  toggle(isFromHistory) {
    const self = this;
    self.isVisible = !self.isVisible;

    if (self.isVisible) {
      self.element.checked = true;
    } else {
      self.element.checked = false;
    }

    if (self.isVisible) {
      self.overlay.setVisible(true);
      document.body.style.overflowY = "hidden";
    } else {
      // delay hiding the element to show animation
      setTimeout(() => {
        self.overlay.setVisible(false);
        document.body.style.overflowY = "visible";
      }, 300);
    }

    self.overlay.toggle();

    if (!isFromHistory) {
      self.updateHistory();
    }
  }
}

// type-checking
Nav.propTypes = {
  nav: PropTypes.object.isRequired
};

export default withRouter(Nav);
