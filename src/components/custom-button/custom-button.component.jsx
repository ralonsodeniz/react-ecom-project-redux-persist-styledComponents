import React from "react";
import "./custom-button.styles.scss";

const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}) => (
  <button
    className={`${
      inverted ? "inverted" : ""
    } {isGoogleSignIn ? "google-sign-in" : ""} custom-button`}
    {...otherProps}
  >
    {/* we use the props isGoogleSignIn to dynamically set a className to the button in case it is that kind of button and set some styles in that case */}
    {children}
  </button>
);

export default CustomButton;
