import {Outlet} from "react-router-dom";
import FirstViewModal from "./components/FirstViewModal.tsx";

function App() {
  return (
    <main>
      <FirstViewModal />
      <Outlet />
    </main>
  );
}

export default App;
