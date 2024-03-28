import {Outlet} from "react-router-dom";
// import { SpeedInsights } from "@vercel/speed-insights/next"
import FirstViewModal from "./components/FirstViewModal.tsx";


function App() {
  return (
    <main>
      <FirstViewModal />
      {/*<SpeedInsights/>*/}
      <Outlet />
    </main>
  );
}

export default App;
