import React, { Component } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch'
import { extractLocations, getEvents } from './api';
import NumberOfEvents from './NumberOfEvents';
import { ErrorAlert } from "./Alert";
import EventGenre from './EventGenre';

class App extends Component {


  state = {
    events: [],
    locations: [],
    numberOfEvents: 16,
    location: 'all'
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(',').shift()
      return { city, number };
    })
    return data;
  };

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
        {!navigator.onLine ? (<ErrorAlert text='You are offline!' />) : (<ErrorAlert text=' ' />)}
        
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents}
        />
      <div className='data-vis-wrapper'>
        <EventGenre events={this.state.events} />
        <h4>Events in each city</h4>
        <ResponsiveContainer height={400}>
          <ScatterChart
            width={800}
            height={400}
            margin={{
              top: 20, right: 20, bottom: 20, left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis type="number" dataKey="number" name="Number of Events" allowDecimals={false} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
        </div>
        <EventList
          events={this.state.events}
        />
      </div>
    );
  }
}


export default App;
