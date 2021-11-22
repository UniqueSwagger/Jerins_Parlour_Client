import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import Footer from "./Components/Shared/Footer/Footer";
import Navigation from "./Components/Shared/Navigation/Navigation";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Services from "./Components/Services/Services";
import AuthProvider from "./context/AuthProvider";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import BookingDashBoard from "./Components/BookingDashBoard/BookingDashBoard";
import AdminDashBoard from "./Components/AdminDashBoard/AdminDashBoard";
import AdminRoute from "./AdminRoute/AdminRoute";
import NotFound from "./Components/NotFound/NotFound";
import PrivateRoute from "../src/PrivateRoute/PrivateRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Navigation />
              <Home />
              <Footer />
            </Route>
            <Route path="/home">
              <Navigation />
              <Home />
              <Footer />
            </Route>
            <Route path="/services">
              <Navigation />
              <Services />
              <Footer />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            <PrivateRoute path="/book/:id">
              <BookingDashBoard />
            </PrivateRoute>
            <AdminRoute path="/admin">
              <AdminDashBoard />
            </AdminRoute>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
