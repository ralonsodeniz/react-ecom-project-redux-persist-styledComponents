import React from "react";
import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" onChange={handleChange} {...otherProps} />
      {/*  the ...otherProps are all of the props of the input component in the sign-in.component */}
      {label ? (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {/* this label will always have form-input-label className and if the user has entered anything to the input it will also have the shrink className */}
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
