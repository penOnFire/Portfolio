import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImmersiveLayout, { ImmersivePage } from "./components/layouts/ImmersiveLayout";
import MinimalLayout from "./components/layouts/MinimalLayout";
import MinimalLanding from "./components/pages/MinimalLanding";
import { ViewTransitionProvider } from "./context/ViewTransitionContext";

function App() {
  return (
    <BrowserRouter>
      <ViewTransitionProvider>
      <Routes>
        <Route element={<ImmersiveLayout />}>
          <Route path="/" element={<ImmersivePage />} />
          <Route path="/immersive" element={<ImmersivePage />} />
        </Route>
        <Route element={<MinimalLayout />}>
          <Route path="/minimal" element={<MinimalLanding />} />
        </Route>
      </Routes>
      </ViewTransitionProvider>
    </BrowserRouter>
  );
}

export default App;
