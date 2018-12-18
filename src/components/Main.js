import React, { Component } from 'react';
import Flags from './flags/Flags';

class Main extends Component {
  fetchData = () => {
    return fetch('https://restcountries.eu/rest/v2/all');
  };

  render() {
    return <Flags fetchData={this.fetchData} />;
  }
}

export default Main;
