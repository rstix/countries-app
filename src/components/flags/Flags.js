import React, { Component } from 'react';
import { getRandomInt } from '../../helpers';

class Flags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      points: 0,
      countries: [],
      seconds: 300
    };
  }

  randomInt = getRandomInt(0, 4);
  countdown;

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
    let answers = [];
    for (let j = 0; j < 4; j++) {
      const country = { name: '', flag: '' };
      const randomInt = getRandomInt(0, this.state.countries.length + 1);
      country.name = this.state.countries[randomInt].name;
      country.flag = this.state.countries[randomInt].flag;
      answers.push(country);
    }
    this.setState(
      {
        answers
      },
      () => this.timer(30)
    );
  };

  evaluateAnswer = index => {
    if (index === this.randomInt) {
      this.setState({
        points: this.state.points + 1
      });
      this.getRightAnswer();
    }
  };

  timer = seconds => {
    // clear any existing timers
    clearInterval(this.countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    this.countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      // check if we should stop it!
      if (secondsLeft < 0) {
        clearInterval(this.countdown);
        return;
      }
      // display it
      this.setState({
        seconds: secondsLeft
      });
    }, 1000);
  };

  render() {
    return (
      <div className="container-fluid">
        {this.state.answers[0] && (
          <div>
            <div class="card text-center">
              <div class="card-header">
                What is the flag of {this.state.answers[this.randomInt].name}{' '}
              </div>
              <div className="card-body d-flex flex-wrap justify-content-center">
                {this.state.answers.map((country, index) => {
                  return (
                    <img
                      className="flag "
                      src={this.state.answers[index].flag}
                      onClick={() => this.evaluateAnswer(index)}
                    />
                  );
                })}
              </div>
            </div>
            <h1> Points: {this.state.points}</h1>
            <h1> Seconds: {this.state.seconds}</h1>
          </div>
        )}
      </div>
    );
  }
}

export default Flags;
