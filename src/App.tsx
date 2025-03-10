import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StepperComponent } from "./components/StepperComponent/StepperComponent"
import { SwitchLoginSignUpComponent } from './components/common_components/SwitchLoginSignUp/SwitchLoginSignUp';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<SwitchLoginSignUpComponent />} />
          <Route path="/stepper" element={<StepperComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
