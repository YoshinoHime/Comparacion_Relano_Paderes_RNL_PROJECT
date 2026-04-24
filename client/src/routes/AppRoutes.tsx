import { Route, Routes } from "react-router-dom";
import AppLayout from "../Layout/AppLayout";
import GenderMainPage from "../pages/Genders/GenderMainPage";
import EditGenderPage from "../pages/Genders/EditGenderPage";
import DeleteGenderPage from "../pages/Genders/DeleteGenderPage";
import UserMainPage from "../pages/User/UserMainPage";



const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<GenderMainPage />} />
        <Route path="/gender/edit" element={<EditGenderPage />} />
        <Route path="/gender/delete" element={<DeleteGenderPage />} />
        <Route path="/users" element={<UserMainPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
