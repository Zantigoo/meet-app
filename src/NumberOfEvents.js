import React, {Component} from "react";
import { WarnAlert } from "./BasicAlert";

class NumberOfEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfEvents: 16,
      infoText:''
    };
  };


  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 1 || value > 32) {
      this.setState({
        numberOfEvents: 16,
        infoText: 'Please enter a number between 1 and 16',
      })
    } else {
      this.setState({
        numberOfEvents: value,
        infoText: '',
      });
    }
    this.props.updateNumberOfEvents(event.target.value);
  };



  render() {
    return (
      <div className='NumberOfEvents'>
        <p><b>Number of Events:</b></p>
        <input
        type='number'
        name='number'
        className="number-of-events"
        min='0'
        max='32'
        onChange={(event) => this.handleInputChanged(event)}
        />
        <WarnAlert text={this.state.infoText}/>
      </div>
    )
  }
}

export default NumberOfEvents;