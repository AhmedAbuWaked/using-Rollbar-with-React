import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Rollbar from 'rollbar';
import { Provider, ErrorBoundary, useRollbar } from '@rollbar/react';
import Test from './Test';

const _rollbarConfig = {
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.REACT_APP_ENVIROMENT,
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: process.env.REACT_APP_GIT_SHA,
        guess_uncaught_frames: true
      }
    }
  }
};
Rollbar.init(_rollbarConfig);
// const rollbar = new Rollbar(_rollbarConfig);
// Rollbar.configure();

function App() {
  // const [rollbar, setRollbar] = useState(
  //   new Rollbar({
  //     accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  //     captureUncaught: true,
  //     captureUnhandledRejections: true,
  //     environment: 'development12'
  //   })
  // );
  // useEffect(() => {
  //   setRollbar(
  //     new Rollbar({
  //       accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  //       captureUncaught: true,
  //       captureUnhandledRejections: true
  //     })
  //   );
  // }, []);
  // useRollbar(rollbar);
  return (
    <Provider config={_rollbarConfig}>
      <ErrorBoundary>
        <div className='App'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <Test />
            <button
              onClick={() => {
                try {
                  console.log('Clicked');
                  throw new Error(
                    'This is Testing Error For Last Time Clicking'
                  );
                } catch (e) {
                  Rollbar.error(e);
                  console.log(
                    '🚀 ~ file: App.js ~ line 63 ~ App ~ Error',
                    e.message
                  );
                }
              }}
            >
              click
            </button>
          </header>
        </div>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
