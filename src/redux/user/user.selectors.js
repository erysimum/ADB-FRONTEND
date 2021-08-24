import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectCurrentUsername = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser.username
);

export const selectToken = createSelector([selectUser], (user) => user.token);
