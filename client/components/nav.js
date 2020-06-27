const React = require("react");

const Nav = ({ path, products }) => {
  return (
    <nav className="nav">
      <Link to="/home" className={path === "/home" ? "selected" : ""}>
        Home
      </Link>
      <Link to="/products" className={path === "/products" ? "selected" : ""}>
        {`Products(${products.length})`}
      </Link>
      <Link to="/create" className={path === "/create" ? "selected" : ""}>
        Create a Product
      </Link>
    </nav>
  );
};

module.exports = Nav;
