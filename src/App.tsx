import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StepperComponent } from "./components/StepperComponent/StepperComponent"
import { SwitchLoginSignUpComponent } from './components/common_components/SwitchLoginSignUp/SwitchLoginSignUp';
import { PrivateRoute } from "./components/ProtectedContent/PrivateRoute"
import { AuthProvider } from './components/ProtectedContent/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SwitchLoginSignUpComponent />} />
          <Route path="/stepper" element={<PrivateRoute element={<StepperComponent />} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
