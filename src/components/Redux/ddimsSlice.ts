// counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the counter
interface ComponentInterface {
  switchLoginSignUp: boolean;
}

const initialState: ComponentInterface = {
    switchLoginSignUp: true,
};

// Create a slice
const componentSlice = createSlice({
  name: 'signUpLoginSwitch',  // name of the slice
  initialState,     // initial state of the counter
  reducers: {
    // Increment action
    swicthLoginSignUpComponent: (state, action) => {
      state.switchLoginSignUp = !action.payload;
    },
  },
});

// Export the increment action
export const { swicthLoginSignUpComponent } = componentSlice.actions;

// Export the reducer
export default componentSlice.reducer;
