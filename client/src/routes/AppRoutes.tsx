import { Route, Routes } from "react-router-dom"
import AppLayout from "../Layout/AppLayout"
import FloatingLabelInput from "../components/input/FloatingLabelInput";
import { useState } from "react";

const SampleComponent = () => {
    const [firstname, setFirstName] = useState (" ");
    const [lastname, setLastName] = useState (" ");
    const [birthdate, setBirthDate] = useState (" ");
    const [password, setPassword] = useState (" ");

    return (
        <>
          <h1 className="text-red-600">Hello World</h1>
          <div className="mb-4">
          <FloatingLabelInput label="First Name"
          type="text" name="first_name" value={firstname} onChange={(e) => setFirstName(e.target.value)} required autoFocus/>
          <p className="font-medium">First Name: {firstname}</p>

          </div>
          <div className="mb-4">
          <FloatingLabelInput label="Last Name" type="text" name="last_name" value={lastname} onChange={(e) => setLastName(e.target.value)} required/>
          <p className="font-medium">Last Name: {lastname}</p>
          </div>

          <div className="mb-4">
          <FloatingLabelInput label="Birth Date"
          type="date" name="birth_date" value={birthdate} onChange={(e) => setBirthDate(e.target.value)} />
          <p className="font-medium">Birth Date: {birthdate}</p>
          </div>

          <div className="mb-4">
          <FloatingLabelInput label="Password" 
          type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <p className="font-medium">Password: {password}</p>
          </div>
        </>
    );
};

const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<SampleComponent/> }/>
        </Route> 
    </Routes>
    </>
  );
};

export default AppRoutes