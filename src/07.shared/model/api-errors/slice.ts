import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { IApiError, IApiErrorState } from "./types";

const initialState: IApiErrorState = { errors: [] };

const apiErrorSlice = createSlice({
  name: "apiError",
  initialState,
  reducers: {
    addApiError: {
      reducer: (state, action: PayloadAction<IApiError>) => {
        state.errors.push(action.payload);
      },
      prepare: (error: Omit<IApiError, "id">) => ({
        payload: { id: nanoid(), ...error } satisfies IApiError,
      }),
    },
    removeApiError: (state, action: PayloadAction<string>) => {
      state.errors = state.errors.filter((error) => error.id !== action.payload);
    },
    clearApiErrors: (state) => {
      state.errors = [];
    },
  },
});

export const { addApiError, removeApiError, clearApiErrors } =
  apiErrorSlice.actions;

export const apiErrorReducer = apiErrorSlice.reducer;
