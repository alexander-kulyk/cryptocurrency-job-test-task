import { type Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseRtkApi } from "@/07.shared/api";
import { createApiErrorMiddleware, apiErrorReducer } from "@/07.shared/model";

// The swap preview surfaces its own errors inline (e.g. an unsupported pair
// returns "assetNotFound"), so it is excluded from the global error overlay.
const apiErrorMiddleware = createApiErrorMiddleware({
  ignoredEndpoints: ["getSwapPreview"],
});

const combines = combineReducers({
  [baseRtkApi.reducerPath]: baseRtkApi.reducer,
  apiError: apiErrorReducer,
});

type CombinedState = ReturnType<typeof combines>;

const rootReducer = (
  state: CombinedState | undefined,
  action: Action,
): CombinedState => {
  if (action.type === "user/logout") {
    state = undefined;
  }
  return combines(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(baseRtkApi.middleware)
      .concat(apiErrorMiddleware),
});

setupListeners(store.dispatch);

export default store;
