import { ISessionToken } from '../types/types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import uuid from 'react-uuid';

interface IAppState {
  sessionToken: ISessionToken | null;
  anonymousId: string;
}

const initialState = (): IAppState => {
  let sessionToken = null;

  const sessionTokenString = window.sessionStorage.getItem('sessionToken');

  if (sessionTokenString) {
    sessionToken = JSON.parse(sessionTokenString);
  }

  const anonymousId = window.sessionStorage.getItem('anonymousId') ?? uuid();
  window.sessionStorage.setItem('anonymousId', anonymousId);

  return {
    sessionToken,
    anonymousId,
  };
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateSessionToken: (state, action: PayloadAction<ISessionToken | null>) => {
      state.sessionToken = action.payload;
    },
  },
});

const selectSessionToken = ({ app: { sessionToken } }: RootState) => sessionToken;
const selectAnonymousId = ({ app: { anonymousId } }: RootState) => anonymousId;

export { selectSessionToken, selectAnonymousId };
export const { updateSessionToken } = appSlice.actions;
export default appSlice.reducer;
