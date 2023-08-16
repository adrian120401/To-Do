import { Home } from "./Home/Home";
import {Account} from "./page/Account/Account";
import {SignIn} from "./page/Signin/SignIn";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { Navbar } from "./components/NavBar";
import Protected from "./components/Protected";
import { ListsProvider } from "./context/ListContext";
const url = 'http://localhost:8443'

function App() {
  return (
      <div>
        <AuthContextProvider>
          <ListsProvider> 
            <Navbar url={url}/>
              <Routes>
              <Route path="/" element={<Home url={url}/>}/>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/account" element={<Protected><Account /></Protected>} />
            </Routes>
          </ListsProvider> 
          
        </AuthContextProvider>
      </div>
  );
}

export default App;
