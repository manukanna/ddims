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
  loginDetails:{
    name_email: string, 
    password: string,
  }

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
    },
    loginDetails:{
      name_email: '', 
      password: ''
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
    updateLoginDetails:(state,action)=>{
      state.loginDetails = action.payload
    },
  },
});


// Export the increment action
export const { swicthLoginSignUpComponent, updateSignUpData, updateLoginDetails} = componentSlice.actions;

// Export the reducer
export default componentSlice.reducer;
