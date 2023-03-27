import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import columnsReducer from "../components/Columns/columnsSlice";

export const store = configureStore({
  reducer: {
    columns: columnsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
