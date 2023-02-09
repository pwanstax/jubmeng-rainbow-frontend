import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import NoPage from "./pages/NoPage";
import ClinicPage from "./pages/ClinicPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<ClinicPage />} />
          <Route path="/" exact element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
