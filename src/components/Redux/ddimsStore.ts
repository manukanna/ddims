// store.ts
import { configureStore } from '@reduxjs/toolkit';
import componentSlice from './ddimsSlice';  // import your slice's reducer

const store = configureStore({
  reducer: {
    swicthLoginSignUpComponent: componentSlice,  // Add the counter reducer to the store
    updateSignUpData: componentSlice,
  },
});

export default store;
