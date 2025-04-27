import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StepperComponent } from "./components/StepperComponent/StepComponent"
import { AdminComponents } from "./components/AdminComponents/adminComponents"
import { UserComponents } from "./components/UserComponent/userComponents"  
import { SwitchLoginSignUpComponent } from './components/CommonComponents/SwitchLoginSignUp/SwitchLoginSignUp';
import { PrivateRoute } from "./components/ProtectedContent/PrivateRoute"
import { AuthProvider } from './components/ProtectedContent/AuthContext';
import { useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { loggedUserDetails } from './components/Redux/ddimsSlice';

function App() {
  const dispatch = useDispatch()
  const fetchMyData = useCallback(async () => {
    const userToken = Cookies.get('authToken');
    if (userToken) {
      const url = process.env.REACT_APP_API_URL+'/me';
      try {
        const resposne = await fetch(url, {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        })
        const res = await resposne.json();
        if (!resposne.ok) {
          alert('sdfgh')
        } else {
          dispatch(loggedUserDetails(res.userDetails))
        }
      }
      catch (err: any) {
         Cookies.remove('authToken');
          Cookies.remove('tokenExpiry');
        console.log(err);
      }
    }
  }, [dispatch])
  useEffect(() => {
    fetchMyData();
  }, [fetchMyData])
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SwitchLoginSignUpComponent />} />
          <Route path='/admin' element={<PrivateRoute element={<AdminComponents />} />} />
          <Route path='/stepper' element={<PrivateRoute element={<StepperComponent />} />} />
          <Route path='/user-form' element={<PrivateRoute element={<UserComponents />} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
