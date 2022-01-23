import React, { Component } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch'
import { getEvents, extractLocations, checkToken, getAccessToken } from
  './api';
import NumberOfEvents from './NumberOfEvents';
import { ErrorAlert } from "./BasicAlert";
import EventGenre from './EventGenre';
import WelcomeScreen from './WelcomeScreen';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//TO DO LIST
// RE-ADD WELCOME SCREEN
// ADD LOGO PNG

const logo = require('./MeetBanner.png')

class App extends Component {


  state = {
    events: [],
    locations: [],
    numberOfEvents: 16,
    location: 'all',
    showWelcomeScreen: undefined
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

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false :
      true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
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
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    return (
      <div className="App">
        {!navigator.onLine ? (<ErrorAlert text='You are offline!' />) : (<ErrorAlert text=' ' />)}
        <img src={logo} alt='Meet-App Logo' style={{ marginBottom: '50px' }} />
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents}
        />
        <Accordion sx={{ background: '#514B6C', marginBottom: 3, margin: 2 }} >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ color: '#FD768C', fontWeight: 'bold' }}>Data Charts</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className='data-vis-wrapper'>

              <EventGenre events={this.state.events} />
              <ResponsiveContainer height={400}>
                <BarChart
                  width={500}
                  height={300}
                  data={this.getData()}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid stroke="#FD768C" />
                  <XAxis type="category" dataKey="city" name="city" stroke="#FD768C" />
                  <YAxis type="number" dataKey="number" stroke="#FD768C" name="Number of Events" allowDecimals={false} />
                  <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                  <Bar dataKey="number" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AccordionDetails>
        </Accordion>
        <EventList
          events={this.state.events}
        />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}


export default App;
