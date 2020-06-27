import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import Create from "./create";
import Products from "./products";
import Nav from "./nav";

const app = document.querySelector("#app");

const API_URL = "http://localhost:3000/api";

class App extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    axios.get(`${API_URL}/products`).then(({ data }) => {
      this.setState({
        products: data.products,
      });
    });
  }

  destroy(product) {
    axios.delete(`${API_URL}/products/${product.id}`);
    this.setState({
      products: this.state.products.filter((prod) => prod.id !== product.id),
    });
  }

  post(product) {
    axios.post(`${API_URL}/products`, product).then(({ data }) =>
      this.setState({
        products: data.data,
      })
    );
  }

  render() {
    const { products } = this.state;
    const { destroy, post } = this;
    return (
      <div>
        <h1> Acme Products </h1>
        <Nav path={location.pathname} products={products} />
        <HashRouter>
          <Switch>
            <Route exact path="/home" render={() => <h1>HOME</h1>} />
            <Route
              path="/products"
              render={() => (
                <Products products={products} destroy={destroy.bind(this)} />
              )}
            />
            <Route
              path="/create"
              render={() => (
                <Create products={products} post={post.bind(this)} />
              )}
            />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

ReactDOM.render(<App />, app, () => {
  console.log("success");
});
