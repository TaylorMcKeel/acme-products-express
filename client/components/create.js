const React = require("react");

class Create extends React.Component {
  state = {
    name: "Name",
  };

  render() {
    const { post } = this.props;
    return (
      <div>
        <h3> Create a Product </h3>
        <div className="inputBox">
          <input
            type="text"
            value={this.state.name}
            onChange={(ev) => {
              this.setState({
                name: ev.target.value,
              });
            }}
          />
          <button
            onClick={() => {
              let product = this.state;
              post(product);
              this.setState({
                name: "Name",
]              });
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

module.exports = Create;
