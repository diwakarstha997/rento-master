import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/partials/navBar";
import Footer from "./components/partials/footer";
import Home from "./components/static/home";
import About from "./components/static/about";
import Contacts from "./components/static/contacts";
import NotFound from "./components/static/notFound";
import AdminLogin from "./components/admin/adminLogin";
import Login from "./components/accounts/login";
import Register from "./components/accounts/register";
import Logout from "./components/accounts/logout";
import Rooms from "./components/rooms/rooms";
import RoomDetail from "./components/rooms/roomDetail";
import Dashboard from "./components/roomOwner/dashboard";
import RoomForm from "./components/roomOwner/rooms/roomForm";
import RoomOwnerApplications from "./components/roomOwner/applications/applications";
import TenantApplications from "./components/tenant/applications";
import { getCurrentUser } from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import ApplicationDetail from "./components/tenant/applicationDetail";
import AdminDashboard from "./components/admin/adminDashboard";
class App extends Component {
  render() {
    const user = getCurrentUser();
    console.log(user);
    return (
      <React.Fragment>
        {/* <Switch> */}
        {/* Guest Routes */}
        {!user && (
          <React.Fragment>
            <Switch>
              <Route
                path="/admin"
                render={(props) => <NavBar {...props} userType="Admin" />}
              />
              <Route path="/" component={NavBar} />
            </Switch>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contacts} />

              <Route exact path="/rooms" component={Rooms} />
              <Route path="/rooms/:id" component={RoomDetail} />

              <Route path="/admin" component={AdminLogin} />

              <ProtectedRoute
                path="/RoomOwner/MyRooms"
                message="Please Login to List Room"
                role="RoomOwner"
              />
              <ProtectedRoute
                path="/RoomOwner/applications"
                message="Please Login"
                role="RoomOwner"
              />
              <ProtectedRoute
                path="/RoomOwner/rooms/new"
                message="Please Login"
                role="RoomOwner"
              />

              <ProtectedRoute
                path="/MyApplications"
                message="Please Login"
                role="Tenant"
              />

              <Route path="/not-found" component={NotFound} />
              <Redirect to="/not-found" />
            </Switch>
            <Switch>
              <Route
                path="/Admin"
                render={(props) => <Footer {...props} userType="Admin" />}
              />
              <Route path="/" component={Footer} />
            </Switch>
          </React.Fragment>
        )}

        {/* RoomOwner Routes */}
        {user && user.userRole === "RoomOwner" && (
          <React.Fragment>
            <Route
              path="/RoomOwner"
              render={(props) => <NavBar {...props} userType="RoomOwner" />}
            />
            <Switch>
              <Route path="/logout" component={Logout} />

              <Route exact path="/RoomOwner/MyRooms" component={Dashboard} />
              <Route
                path="/RoomOwner/applications"
                component={RoomOwnerApplications}
              />
              <Route path="/RoomOwner/rooms/new" component={RoomForm} />

              <Route path="/RoomOwner/not-found" component={NotFound} />

              <Redirect exact from="/" to="/RoomOwner/MyRooms" />
              <Redirect to="/RoomOwner/not-found" />
            </Switch>
            <Route
              path="/RoomOwner"
              render={(props) => <Footer {...props} userType="RoomOwner" />}
            />
          </React.Fragment>
        )}

        {/* Tenant Routes */}
        {user && user.userRole === "Tenant" && (
          <React.Fragment>
            <Route
              path="/"
              render={(props) => <NavBar {...props} userType="Tenant" />}
            />
            <Switch>
              <Route path="/logout" component={Logout} />

              <Route exact path="/rooms" component={Rooms} />
              <Route path="/rooms/:id" component={RoomDetail} />

              <Route
                exact
                path="/MyApplications"
                component={TenantApplications}
              />
              <Route path="/MyApplications/:id" component={ApplicationDetail} />

              <Redirect from="/" to="/rooms" />

              <Route path="/not-found" component={NotFound} />
              <Redirect to="/not-found" />
            </Switch>
            <Route path="/" component={Footer} />
          </React.Fragment>
        )}

        {/* <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" /> */}

        {/* Admin Routes */}
        {user && user.userRole === "Admin" && (
          <React.Fragment>
            <Route
              path="/admin"
              render={(props) => <NavBar {...props} userType="Admin" />}
            />
            <Switch>
              <Route path="/Admin/dashboard" component={AdminDashboard} />
            </Switch>
            <Route
              path="/Admin"
              render={(props) => <Footer {...props} userType="Admin" />}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default App;
