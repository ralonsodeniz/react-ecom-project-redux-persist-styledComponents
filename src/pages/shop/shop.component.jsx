import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import {
  firestore,
  convertCollectionSnapshotToMap
} from "../../firebase/firebase.utils"; // we import firestore so we can fetch the data from the db
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { updateCollections } from "../../redux/shop/shop.actions";

// since shop component is already a routed component we have access to router props. Remember that if the component is not routed we have to use withRouter HOC to have access to them
class ShopPage extends Component {
  unsubscribeFromSnapshot = null; // we will have to close the listener that we are going to start to know when a new snapshot is done
  // the snapshot is going to be the snapshot representation of our collection

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections"); // we create the reference object to our collections collection
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
      // whenever the collectionRef updates or the code is run for the first time this collectionRef this will send us the snapshot representing the code of our collections objects array at the time when this code renders
      const collectionsMap = convertCollectionSnapshotToMap(snapshot);
      // we update the collection into the shop redux using the firebase util function
      updateCollections(collectionsMap);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromSnapshot(); // and then we use it in the componentWillUnmount to close the subscription
  }

  render() {
    const { match } = this.props; // match.path is the exact route we are
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
        {/* /:collectionId means what goes before the match.path, in this case what is next to /shop/ */}
        {/* thanks to this in the CollectionPage we will have access to a new object inside match, params, with will have a property called collectionId (what goes after the : is a param) which value would be the route after /shop (match.path) */}
      </div>
    );
  }
}

// we get the action to trigger the collection update in the redux
const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);
