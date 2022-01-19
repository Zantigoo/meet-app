import React, { Component } from 'react';
import { InfoAlert } from './Alert';


class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined,
    infoText:'',
  }
  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false
    });

    this.props.updateEvents(suggestion);
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText: 'Can not find the city you are looking for...',
      });
    } else {
      return this.setState({
        query: value, 
        suggestions, 
        infoText:''
       });
    }
  };
  render() {
    return (
      <div className="CitySearch">
        <InfoAlert text={this.state.infoText}/>
        <input
          onFocus={ () => { this.setState({ showSuggestions: true }) }}
          onChange={this.handleInputChanged}
          type="text"
          className="city"
          placeholder={this.state.query}
          value={this.state.query}
        />
        <ul 
        className='suggestions'
        style={this.state.showSuggestions ? {}: { display: 'none' }}
        >
          {this.state.suggestions.map((suggestion) => (
            <li 
            key={suggestion}
            onClick={() => this.handleItemClicked(suggestion)}
            >{suggestion}</li>
          ))}
          <li 
          key='all'
          onClick={() => this.handleItemClicked('all')}
          >
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
