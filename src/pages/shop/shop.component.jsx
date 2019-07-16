import React from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

// since shop component is already a routed component we have access to router props. Remember that if the component is not routed we have to use withRouter HOC to have access to them
const ShopPage = (
  { match } // match.patch is the exact route we are
) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    {/* /:collectionId means what goes before the match.path, in this case what is next to /shop/ */}
    {/* thanks to this in the CollectionPage we will have access to a new object inside match, params, with will have a property called collectionId (what goes after the : is a param) which value would be the route after /shop (match.path) */}
  </div>
);

export default ShopPage;
