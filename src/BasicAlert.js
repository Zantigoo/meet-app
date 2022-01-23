import React, {Component} from "react";
import { Alert, Snackbar, Stack } from '@mui/material';


class BasicAlert extends Component {
  constructor(props) {
    super(props);
    this.severity = null;
  }

  render() {
    return(
      <Stack>
        <Snackbar 
        autoHideDuration={6000}
        open={this.props.open}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}} >
        <Alert variant="filled" className='Alert' sx={{ width: '100%' }} severity={this.severity}>{this.props.text}</Alert>
      </Snackbar>
      </Stack>
    )
  }
};

class InfoAlert extends BasicAlert {
  constructor(props) {
    super(props);
    this.severity = 'info';
  }
};

class WarnAlert extends BasicAlert {
  constructor(props) {
    super(props);
    this.severity = 'warning';
  }
};

class ErrorAlert extends BasicAlert {
  constructor(props) {
    super(props);
    this.severity = 'error';
  }
}

export {InfoAlert, WarnAlert, ErrorAlert};