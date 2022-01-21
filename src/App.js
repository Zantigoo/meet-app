import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch'
import { extractLocations, getEvents } from './api';
import NumberOfEvents from './NumberOfEvents';
import { ErrorAlert } from "./Alert";


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

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') 
      ? events : events.filter((event) => event.location === location);
      const { numberOfEvents } = this.state;
      this.setState({
        events: locationEvents.slice(0, numberOfEvents)
      });
    });
  };

  updateNumberOfEvents = (numberOfEvents) => {
    if (numberOfEvents > 0 && numberOfEvents < 32) {
      this.setState({
        numberOfEvents
      }, this.updateEvents(this.state.location, numberOfEvents));
    }
  };

  render() {
    return (
      <div className="App">
        { !navigator.onLine ? (<ErrorAlert text='You are offline!' />) : (<ErrorAlert text=' ' />)}
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents} 
          updateNumberOfEvents={this.updateNumberOfEvents}
        />
        <EventList
          events={this.state.events}
        />
      </div>
    );
  }
}


export default App;
