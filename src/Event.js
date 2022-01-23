import React, { Component } from "react";
import {Button, Card, CardActions, CardContent} from '@mui/material';

class Event extends Component {

  state = {
    event: {},
    collapsed: true,
  };

  handleClick = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const {event} = this.props;
    const {collapsed} = this.state;
    return (

      <Card style={{backgroundColor : '#5977B1'}} variant="outlined" className="event">
        <CardContent>
        <h2 className="summary">{event.summary}</h2>
        <p className="startDate">
          {event.start.dateTime} ({event.start.timeZone})
        </p>
        <p className="location">
          @{event.summary} | {event.location}
        </p>
        </CardContent>
        <CardActions>
        <Button 
          style={{color: '#FD768C'}}
          className={`${collapsed ? "show" : "hide"}Details`}
          onClick={this.handleClick}
        >
          {collapsed ? "Show Details" : "Hide Details"}
        </Button>
        </CardActions>
        {!collapsed &&
            <div className={`extraDetails ${this.state.collapsed ? "hide" : "show"}`}>
                <h3>About the event:</h3>
                <a href={event.htmlLink} rel="noreferrer" target="_blank">
                  See details on Google Calendar
                </a>
                <p className="eventDescription">{event.description}</p>
            </div>
          }
      </Card>
    )
  }
}

export default Event;