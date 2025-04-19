import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// Parital
import NavBar from "./components/partials/navBar";
import Footer from "./components/partials/footer";
import VerificationMessage from "./components/partials/verificationMessage";

// static components
import Home from "./components/static/home";
import About from "./components/static/about";
import Contacts from "./components/static/contacts";
import NotFound from "./components/static/notFound";

// public pages imports
import Rooms from "./components/rooms/rooms";
import RoomDetail from "./components/rooms/roomDetail";

// account realated imports
import Login from "./components/accounts/login";
import Register from "./components/accounts/register";
import Logout from "./components/accounts/logout";
import Profile from "./components/accounts/profile/profile";
import EmailActivate from "./components/accounts/emailActivate";
import ForgotPassword from "./components/accounts/forgetPassword";
import InvalidToken from "./components/accounts/invalidToken";

// protected routes esssential
import ProtectedRoute from "./components/common/protectedRoute";

// admin imports
import AdminLogin from "./components/admin/adminLogin";
import AdminDashboard from "./components/admin/adminDashboard";
import AdminRoomDetail from "./components/admin/room/adminRoomDetail";

// room owner imports
import Dashboard from "./components/roomOwner/dashboard";
import RoomForm from "./components/roomOwner/rooms/roomForm";
import RoomOwnerApplications from "./components/roomOwner/applications/applications";
import OwnerRoomDetail from "./components/roomOwner/rooms/roomDetail";

// tenant imports
import TenantApplications from "./components/tenant/applications/applications";
import ApplicationDetail from "./components/tenant/applications/applicationDetail";

// service provider imports
import { getCurrentUser } from "./services/authService";
import { getUserVerificationData } from "./services/userService";

class App extends Component {
  state = { toggled: true };
  handleToggle = () => {
    let toggled;
    if (!this.state.toggled) toggled = true;
    else toggled = false;
    this.setState({ toggled: toggled });
  };
  

  render() {
    const user = getCurrentUser();
    let uv_data;
    if (user) uv_data = getUserVerificationData();

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

              <Route path="/admin/login" component={AdminLogin} />
              <Redirect exact from="/admin" to="/admin/login" />

              <Route path="/activation/:id" component={EmailActivate} />

              <Route path="/forgotPassword/:id" component={ForgotPassword} />
              <Route path="/not-confirmed" component={InvalidToken} />

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
            <Route path="/RoomOwner" component={NavBar} />
            <VerificationMessage />
            <Switch>
              <Route path="/logout" component={Logout} />

              <Route
                exact
                path="/RoomOwner/profile/verify"
                render={(props) => (
                  <Profile {...props} active="verifyIdentity" />
                )}
              />
              <Route path="/RoomOwner/profile" component={Profile} />

              <Route exact path="/RoomOwner/MyRooms" component={Dashboard} />
              <Route
                path="/RoomOwner/applications"
                component={RoomOwnerApplications}
              />
              <Route path="/RoomOwner/room/:id" component={OwnerRoomDetail} />
              <Route path="/RoomOwner/rooms/new" component={RoomForm} />

              <Route
                path="/RoomOwner/activation/:id"
                component={EmailActivate}
              />

              <Route path="/RoomOwner/not-found" component={NotFound} />

              <Redirect
                exact
                from="/activation/:id"
                to="/RoomOwner/activation/:id"
              />

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
            <Route path="/" component={NavBar} />
            <VerificationMessage />
            <Switch>
              <Route path="/logout" component={Logout} />

              <Route
                exact
                path="/profile/verify"
                render={(props) => (
                  <Profile {...props} active="verifyIdentity" />
                )}
              />

              <Route exact path="/profile" component={Profile} />

              <Route exact path="/rooms" component={Rooms} />
              <Route path="/rooms/:id" component={RoomDetail} />

              <Route
                exact
                path="/MyApplications"
                component={TenantApplications}
              />
              {uv_data.verified && (
                <Route
                  path="/MyApplications/:id"
                  component={ApplicationDetail}
                />
              )}

              <Route path="/activation/:id" component={EmailActivate} />

              <Redirect exact from="/" to="/rooms" />

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
              render={(props) => (
                <NavBar
                  {...props}
                  handleToggle={this.handleToggle}
                  userType="Admin"
                />
              )}
            />
            <Switch>
              <Route
                path="/adminLogout"
                render={(props) => <Logout {...props} user="Admin" />}
              />
              <Route path="/Admin/profile" component={Profile} />
              <Route path="/Admin/rooms/:id" component={AdminRoomDetail} />
              <Route
                path="/Admin/dashboard/:id"
                render={(props) => (
                  <AdminDashboard {...props} toggled={this.state.toggled} />
                )}
              />

              <Route
                path="/Admin/dashboard"
                render={(props) => (
                  <AdminDashboard {...props} toggled={this.state.toggled} />
                )}
              />

              <Redirect exact from="/" to="/Admin/dashboard" />
              <Redirect exact from="/admin" to="/Admin/dashboard" />

              <Route path="/Admin/not-found" component={NotFound} />
              <Redirect to="/Admin/not-found" />
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
