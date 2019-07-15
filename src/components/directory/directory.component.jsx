import React from "react";
import MenuItem from "../menu-item/menu-item.component";
import "./directory.styles.scss";
import { connect } from "react-redux";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import { createStructuredSelector } from "reselect";

const Directory = ({ sections }) => (
  <div className="directory-menu">
    {sections.map(({ id, ...otherSectionProps }) => {
      // this is the same as {id, title, imageUrl, size, linkUrl} but using Object spread operator | keep in mind that for this to be possible the names of the consts has to be the same of the properties
      return <MenuItem key={id} {...otherSectionProps} />; // we don't spread id because we do not need it in the children but in the declaration of the component to give it a key since we are mapping components through an array
    })}
  </div>
);
// this is mapStateToProps without reselect and using object deconstruction of state to get the item we need inside an specific reducer
// const mapStateToProps = ({ directory: { sections } }) => ({ sections });
// this is mapStateToProps using reselect and createStructuredSelector
// createStructuredSelector automatically pass to selectDirectorySections the state
const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
