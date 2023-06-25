import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userApi from "../features/api/userApi";
import coursesApi from "../features/coursesSlice/courseApi";
const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [coursesApi.reducerPath]: coursesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, coursesApi.middleware),
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;