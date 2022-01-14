import React, {Component} from "react";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 16,
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 1 || value > 16) {
      this.setState({
        numberOfEvents: '',

      })
    } else {
      this.setState({
        numberOfEvents: value,

      })
    }
  };

  render() {
    return (
      <div className='NumberOfEvents'>
        <p><b>Number of Events:</b></p>
        <input
        type='number'
        name='number'
        className="number-of-events"
        placeholder={this.state.numberOfEvents}
        value={this.props.numberOfEvents}
        onChange={(e) => this.handleInputChanged(e)}
        />
      </div>
    )
  }
}

export default NumberOfEvents;