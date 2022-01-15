import React, {Component} from "react";

class NumberOfEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 16
    };
  };
  handleInputChanged = (event) => {
    const value = event.target.value
    this.setState({
      number: value,
    });
    
    if (this.props.updateNumberOfEvents)
      this.props.updateNumberOfEvents(value);

  }

  RemoveNonNumeric = (text) => {
    return text.replace(/[^0-9]/g, '');
  }

  render() {
    return (
      <div className='NumberOfEvents'>
        <p><b>Number of Events:</b></p>
        <input
        type='number'
        name='number'
        className="number-of-events"
        placeholder={this.state.number}
        value={this.state.number}
        onChange={this.handleInputChanged}
        />
      </div>
    )
  }
}

export default NumberOfEvents;