import React from "react";
import { withRouter } from "react-router-dom";
import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => {
  return (
    <div
      className={`${size} menu-item`} // in case the item has the size large property in the state at directory we apply an additional classname so the appropiated style is applied
      onClick={() => history.push(`${match.url}${linkUrl}`)} // we use match.url because we need to know first where we are, which was the url that make us render certain page and after we use the route we want to access /someMatchedUrl/linkUrl | in this case match.url is just "/" we could just have written `/${linkUrl}`
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})` // we use inline css-js to apply the background image to our menu item by using the url passed as props
        }}
      />
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem); // this wraps MenuItem in a HOC that gives it access to Router props
