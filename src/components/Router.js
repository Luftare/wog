import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("router")
@observer
class Router extends Component {
  render() {
    return <this.props.router.currentRoute.component />;
  }
}

export default Router;
