import './App.css';
import CustomForm from './pages/CustomForm';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AllFormList from './pages/AllFormList';
import { editForm, SubmitForm } from './actions/formAction';
import React, { useContext } from 'react';
import { useAlert } from 'react-alert';
export const AlertContext = React.createContext("")
function App() {
  const alert = useAlert();

  return (
    <BrowserRouter>
      <AlertContext.Provider value={alert}>
        <div className="container">
          <Routes>
            <Route path="/list" element={<AllFormList />} />
            <Route path='/' element={<CustomForm action={"Submit"} callback={SubmitForm} />} />
            <Route path='/edit/:id' element={<CustomForm action={"Save Change"} callback={editForm} />} />
          </Routes>
        </div>
      </AlertContext.Provider>
    </BrowserRouter>
  );
}

export default App;
