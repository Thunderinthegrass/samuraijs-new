
import './App.css'
import {Route, Routes} from "react-router-dom";
import Dialogs from "./components/Dialogs/Dialogs.jsx";
import Layout from "./components/Layout.jsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="Dialogs" element={<Dialogs />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
