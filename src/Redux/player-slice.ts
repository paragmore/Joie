import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {audioModal, userModal} from '../Modal/media_modal';

interface PlayerState {
  audioData?: any;
  userData?: any;
}

const initialState: PlayerState = {
  audioData: {},
  userData: {},
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setAudioPlayerData(state, action: PayloadAction<audioModal>) {
      state.audioData = action.payload;
    },
    setLoginUserData(state, action: PayloadAction<userModal>) {
      state.userData = action.payload;
    },
  },
});

export const {setAudioPlayerData, setLoginUserData} = playerSlice.actions;
export default playerSlice.reducer;
