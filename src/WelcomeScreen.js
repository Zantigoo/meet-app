import React from "react";
import './WelcomeScreen.css';
import {Button} from '@mui/material'


function WelcomeScreen(props) {
  return props.showWelcomeScreen ?
    (
      <div className="WelcomeScreen">
        <h1>Welcome to the Meet app</h1>
        <h4>
          Log in to see upcoming events around the world for
          full-stack
          developers
        </h4>
        <div className="button_cont" align="center">
          <div className="google-btn">

            <Button onClick={() => { props.getAccessToken() }}
              rel="nofollow noopener"
              className="btn-text"
              style={{color:'#FD768C', backgroundColor: '#514B6C', marginBottom: '20px'}}
              variant="contained"
            >
              <b>Sign in with google</b>
            </Button>
          </div>
        </div>
        <a
          href="https://Zantigoo.github.io/meet/privacy.html"
          rel="nofollow noopener"
        >
          Privacy policy
        </a>
      </div>
    )
    : null
}
export default WelcomeScreen;