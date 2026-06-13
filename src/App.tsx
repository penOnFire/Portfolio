import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImmersiveLayout, { ImmersivePage } from "./components/layouts/ImmersiveLayout";
import MinimalLayout from "./components/layouts/MinimalLayout";
import MinimalLanding from "./components/pages/MinimalLanding";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ImmersiveLayout />}>
          <Route path="/" element={<ImmersivePage />} />
          <Route path="/immersive" element={<ImmersivePage />} />
        </Route>
        <Route element={<MinimalLayout />}>
          <Route path="/minimal" element={<MinimalLanding />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
