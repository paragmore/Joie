import {combineReducers, configureStore} from '@reduxjs/toolkit';
import playerSlice from './player_slice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const reducer = combineReducers({
  player: playerSlice,
});

export const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat();
  },
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
