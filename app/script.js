class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <input value={this.state.input} onChange={this.handleChange} />

        <button type="submit">Submit!</button>
      </div>
    );
  }
}

ReactDOM.render(<MyForm />, document.querySelector("#app"));
