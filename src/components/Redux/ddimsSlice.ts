// counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the counter
interface ComponentInterface {
  switchLoginSignUp: boolean;
  signUpDetails:{firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string,
    email: string,
    catogery: string,
  };
}

const initialState: ComponentInterface = {
    switchLoginSignUp: true,
    signUpDetails:{
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      email: "",
      catogery: "",
    }
};

// Create a slice
const componentSlice = createSlice({
  name: 'counter',  // name of the slice
  initialState,     // initial state of the counter
  reducers: {
    // Increment action
    swicthLoginSignUpComponent: (state, action) => {
      state.switchLoginSignUp = action.payload;
    },
    updateSignUpData: (state, action) => {
      state.signUpDetails = action.payload
    },
  },
});


// Export the increment action
export const { swicthLoginSignUpComponent, updateSignUpData} = componentSlice.actions;

// Export the reducer
export default componentSlice.reducer;
