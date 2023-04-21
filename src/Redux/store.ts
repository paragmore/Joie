// import {combineReducers, configureStore} from '@reduxjs/toolkit';
// import {authSlice} from './auth-api-slice';
// import {booksSlice} from './books-api-slice';
// import {categorySlice} from './category-api-slice';
// import playerSlice from './player-slice';
// import {searchSlice} from './search-api-slice';
// import {userSlice} from './user-api-slice';

// const reducer = combineReducers({
//   [authSlice.reducerPath]: authSlice.reducer,
//   [booksSlice.reducerPath]: booksSlice.reducer,
//   [categorySlice.reducerPath]: categorySlice.reducer,
//   [searchSlice.reducerPath]: searchSlice.reducer,
//   [userSlice.reducerPath]: userSlice.reducer,
//   player: playerSlice,
// });

// export const store = configureStore({
//   reducer: reducer,
//   middleware: getDefaultMiddleware => {
//     return getDefaultMiddleware({
//       serializableCheck: false,
//     }).concat(
//       authSlice.middleware,
//       booksSlice.middleware,
//       categorySlice.middleware,
//       searchSlice.middleware,
//       userSlice.middleware,
//     );
//   },
// });
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
