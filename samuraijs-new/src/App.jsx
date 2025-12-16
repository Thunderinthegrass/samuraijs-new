
import './App.css'
import {Route, Routes} from "react-router-dom";
import DialogsFinalForm from "./components/Dialogs/DialogsFinalForm.jsx";
import Layout from "./components/Layout.jsx";
import Dialogs from "./components/Dialogs/Dialogs.jsx";
import LoginFinal from "./components/LoginFinal/LoginFinal.jsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="Dialogs" element={<Dialogs />} />
          <Route path="DialogsFinalForm" element={<DialogsFinalForm />} />
          {/*<Route path="/LoginFinal" element={<LoginFinal />} />*/}
        </Route>
      </Routes>
    </>
  )
}

export default App
