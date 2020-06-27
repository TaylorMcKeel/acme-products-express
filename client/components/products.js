const React = require("react");

class Products extends React.Component {
  render() {
    const { products, destroy } = this.props;
    return (
      <div>
        <h3> Products </h3>
        <ul className="prodList">
          {products.map((prod) => (
            <div key={prod.id} className="productBox">
              <li key={prod.id} className="prod">
                {`${prod.name}, price is: $${prod.price}`}
              </li>
              <button
                onClick={(ev) => {
                  ev.preventDefault();
                  destroy(prod);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

module.exports = Products;
