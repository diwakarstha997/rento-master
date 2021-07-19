import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./component/partials/navBar";
import Footer from "./component/partials/footer";
import Home from "./component/static/home";
import About from "./component/static/about";
import Contacts from "./component/static/contacts";
import NotFound from "./component/static/notFound";
import Login from "./component/accounts/login";
import Register from "./component/accounts/register";
import Logout from "./component/accounts/logout";
import Rooms from "./component/rooms/rooms";
import RoomDetail from "./component/rooms/roomDetail";
import Dashboard from "./component/roomOwner/dashboard";
import RoomForm from "./component/roomOwner/rooms/roomForm";
import Message from "./component/roomOwner/messages/message";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/RoomOwner"
            render={(props) => <NavBar {...props} userType="RoomOwner" />}
          />
          <Route path="/" component={NavBar} />
        </Switch>
        <Switch>
          <Route path="/RoomOwner/MyRooms" component={Dashboard} />
          <Route path="/RoomOwner/messages" component={Message} />
          <Route path="/RoomOwner/rooms/new" component={RoomForm} />

          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/rooms" component={Rooms} />
          <Route path="/rooms/:id" component={RoomDetail} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contacts} />

          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
        <Switch>
          <Route
            path="/RoomOwner"
            render={(props) => <Footer {...props} userType="RoomOwner" />}
          />
          <Route path="/" component={Footer} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
