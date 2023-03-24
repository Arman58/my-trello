import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import columnsReducer from "../components/Columns/columnsSlice";
import tasksReducer from "../components/Task/taskSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    columns: columnsReducer,
    tasks: tasksReducer,
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
