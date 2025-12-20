
import './App.css'
import {Route, Routes} from "react-router-dom";
import DialogsFinalForm from "./components/Dialogs/DialogsFinalForm.jsx";
import Layout from "./components/Layout.jsx";
import Dialogs from "./components/Dialogs/Dialogs.jsx";
import LoginFinal from "./components/LoginFinal/LoginFinal.jsx";
import ProfileContainer from "./components/Profile/ProfileContainer.jsx";
import UsersContainer from "./components/Users/UsersContainer.jsx";
import UsersContainerToolkit from "./components/Users/UsersContainerToolkit.jsx";

function App(props) {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProfileContainer />} />
          <Route path="/profile/:userId?" element={<ProfileContainer />} />
          <Route path="Dialogs" element={<Dialogs />} />
          <Route path="Users" element={<UsersContainer store={props.reduxStore} />} />
          <Route path="UsersToolkit" element={<UsersContainerToolkit />} />
          <Route path="DialogsFinalForm" element={<DialogsFinalForm />} />
          <Route path="/LoginFinal" element={<LoginFinal />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
