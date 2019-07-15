import { createSelector } from "reselect";

// input selector
const selectShop = state => state.shop;
// output selectors
export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectShopCollections],
  collections => Object.keys(collections).map(key => collections[key])
  // Object.keys(object) returns an array with the keys of the object
  // we use it so we can create an array with the objects of the different collections by using map over object.keys resulting array
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectShopCollections],
    collections => collections[collectionUrlParam]
  );
