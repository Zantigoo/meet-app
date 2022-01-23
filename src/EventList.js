import React, { Component } from 'react';
import {Grid} from '@mui/material';
import Event from './Event';

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <Grid container spacing={2} className='EventList'>
        {events.map((event) =>
          <Grid sm={12} item key={event.id}>
            <Event event={event} />
          </Grid>
        )}
      </Grid>
    );
  }
}

export default EventList;