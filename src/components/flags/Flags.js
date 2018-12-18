import React, { Component } from 'react';
import { getRandomInt } from '../../helpers';

class Flags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rightAnwer: { name: null, flag: null },
      flags: [],
      countries: []
    };
  }

  componentWillMount() {
    this.props
      .fetchData()
      .then(res => res.json())
      .then(data => {
        this.setState(
          {
            countries: data
          },
          () => this.getRightAnswer()
        );
      });
  }

  getRightAnswer = () => {
    let rightAnwer = { ...this.state.rightAnwer };
    const randomInt = getRandomInt(0, this.state.countries.length + 1);
    rightAnwer.name = this.state.countries[randomInt].name;
    rightAnwer.flag = this.state.countries[randomInt].flag;
    this.setState({
      rightAnwer
    });
  };

  render() {
    return (
      <div className="container-fluid">
        {this.state.countries && (
          <div>
            <h1 />
            <div class="card text-center">
              <div class="card-header">
                What is the flag of {this.state.rightAnwer.name}{' '}
              </div>
            </div>

            <div class="progress">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${getRandomInt(0, 101)}%` }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
            <img src={this.state.rightAnwer.flag} />
          </div>
        )}
      </div>
    );
  }
}

export default Flags;
