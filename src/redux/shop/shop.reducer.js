// import SHOP_DATA from "./shop.data"; we don't need the SHOP_DATA unless we modify the collections in the file and we want to export them to firestore using the util function we created in firebase.utils
import ShopActionTypes from "./shop.types";

const INITIAL_STATE = {
  collections: null // since collections is an object that contains another object for each collection the initial value has to be null
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload
      };

    default:
      return state;
  }
};

export default shopReducer;
