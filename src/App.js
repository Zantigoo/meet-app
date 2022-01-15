import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch'
import { extractLocations, getEvents } from './api';
import NumberOfEvents from './NumberOfEvents';


class App extends Component {


  state = {
    events:[],
    locations:[],
    numberOfEvents: 16,
    location: 'all'
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location='all', number=this.state.numberOfEvents) => {
    getEvents().then((events) => {
      const locationEvents = (location === "all")
          ? events.slice(0, number)
          : events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, number),
          currentLocation: location,
        });
      }
    });
  };

  updateNumberOfEvents = (numberOfEvents) => {
    this.setState({
      numberOfEvents
    }, this.updateEvents(this.state.location, numberOfEvents));
  };

  render() {
    const { locations, numberOfEvents } = this.state;
    return (
      <div className="App">
        <CitySearch
          locations={locations}
          updateEvents={this.updateEvents}
          numberOfEvents={numberOfEvents}
        />
        <NumberOfEvents
          updateNumberOfEvents={number => {this.updateNumberOfEvents(number)}}
        />
        <EventList
          events={this.state.events}
          numberOfEvents={this.state.numberOfEvents}
        />
      </div>
    );
  }
}


export default App;
