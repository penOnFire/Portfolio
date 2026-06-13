import Landing from "./components/pages/Landing";
import DayNightToggle from "./components/ui/DayNightToggle";
import { DayNightProvider } from "./context/DayNightContext";

function App() {
  return (
    <DayNightProvider>
      <DayNightToggle />
      <Landing />
    </DayNightProvider>
  );
}

export default App;
