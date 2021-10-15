import React from 'react';
import Rollbar from 'rollbar';

const Test = () => {
  try {
    throw new Error('This is Error From Test Component');
  } catch (e) {
    Rollbar.error(e);
  }
  return <div>Hi There</div>;
};

export default Test;
