import MediaControlCard from './MediaControl';
import React from 'react'
import { Paper, Button, TextField } from '@mui/material'
import Header from './Header';
import trybelogo from './images/trybe.png'
import saphireCityAudio from './audios/saphirecity.mp3';
import counterEndSound from './audios/alarm.wav'

const SAPHIRECITY = new Audio(saphireCityAudio);
const COUNTERENDSOUND = new Audio(counterEndSound)

let inputTimeColor = 'success'
let helperText = ''
let pClassName = 'counter'

class App extends React.Component {
  state = {
    counter: '',
    control: true,
    inputTime: '',
    minutesCounter: 0,
    secondsCounter: 0,
    audioControl: true,
    resetDisabled: true,
    inputDisabled: false,
  }


  clocking = () => {
    const { counter } = this.state;
    if (counter >= 0) {
      const minutes = Math.floor(counter / 60);
      const seconds = counter % 60;
      this.setState({
        minutesCounter: minutes,
        secondsCounter: seconds,
      });
    }
  };

  onAudioPlayButton = () => {
    this.setState((prevState) => ({
      audioControl: !prevState.audioControl
    }))
    SAPHIRECITY.play();
  }

  onAudioStopButton = () => {
    this.setState((prevState) => ({
      audioControl: !prevState.audioControl
    }))
    SAPHIRECITY.pause();
  }

  onStartButtonClick = () => {
    pClassName = 'counter'
    this.setState((prevState) => ({
      control: !prevState.control,
      inputDisabled: true,
      resetDisabled: true,
    }))
        this.intervalId = setInterval(() => {
        this.setState((prevState) => ({
          counter: prevState.counter - 1
        }), this.clocking)
      }, 1000);
  }

  onResetButtonClick = () => {
    this.setState({
      counter: '',
      control: true,
      inputTime: '',
      minutesCounter: 0,
      secondsCounter: 0,
      resetDisabled: true,
    })
  }

  onPauseButtonClick = () => {
    pClassName = 'counter'
    this.setState((prevState) => ({
      control: !prevState.control,
      resetDisabled: false,
      inputDisabled: !prevState.inputDisabled,
    }))
    clearInterval(this.intervalId)
  }

  onTimerButtonClick = ({ target }) => {
    switch(target.innerText) {
     case '05:00':
      this.setState({ counter: 300})
      pClassName = 'counter'
      this.setState({
        minutesCounter: 5,
        secondsCounter: 0,
      });
      break;
    case '10:00':
      this.setState({ counter: 600})
      pClassName = 'counter'
      this.setState({
        minutesCounter: 10,
        secondsCounter: 0,
      });
      break;
    case '15:00':
      this.setState({ counter: 900})
      pClassName = 'counter'
      this.setState({
        minutesCounter: 15,
        secondsCounter: 0,
      });
      break;
    default:
    }
  }

  onCustomTimeInputChange = ({ target }) => {
    const value = target.value;
    let minutes = 0;
    let seconds = 0;
    this.setState({ inputTime: value, counter: value })
    const timeSplit = value.split(':');
    if (timeSplit.length > 1) {
      helperText = ''
      minutes = timeSplit[0];
      seconds = timeSplit[1];
      this.setState({ counter: (parseInt(minutes) * 60) + parseInt(seconds)})
      this.setState({ minutesCounter: parseInt(minutes), secondsCounter: parseInt(seconds) })
    }
    if (value.length < 1) {
      helperText = ''
      inputTimeColor = 'success'
      pClassName = 'counter'
      this.setState({ inputTime: value, counter: '0', minutesCounter: minutes, secondsCounter: seconds })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { counter, inputTime } = this.state;
    if (prevState.counter && counter === 0) {
      clearInterval(this.intervalId);
      this.setState({
      control: true,
      resetDisabled: true,
      inputDisabled: false,
      counter: '',
      inputTime: '',
    })
    pClassName = 'counterEnd'
    COUNTERENDSOUND.play()
    }
    if (inputTime.match(/([A-Z])/gi)) {
      helperText = 'Incorrect entry'
      inputTimeColor = 'error'
    }
  }

  render() {
    const { minutesCounter, secondsCounter, control, inputTime, audioControl, resetDisabled, inputDisabled } = this.state
  return (
    <div className="App">
      <header>
        <img src={trybelogo} alt="logo" className="logo" />
        <Header color="secondary" position="fixed" sx={{ width: 100 }} />
      </header>
      <div className="main">
      <main>
      <Paper elevation={1} sx={{ width: 400, height: 400, marginBottom: -1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
        <div className="counter-div">
          <p className={pClassName}>{minutesCounter.toString().padStart(2, "0")}:{secondsCounter.toString().padStart(2, "0")}</p>
        </div>
        <div className="start-pause-buttons">
        {control ? <Button onClick={this.onStartButtonClick} color="success" variant="contained">START</Button> : <Button onClick={this.onPauseButtonClick} color="success" variant="contained">PAUSE</Button>}
        <Button disabled={resetDisabled} onClick={this.onResetButtonClick} color="error" variant="contained">RESET</Button>
        </div>
        <div className="time-input">
        <TextField helperText={helperText} disabled={inputDisabled} onChange={this.onCustomTimeInputChange} value={inputTime} color={inputTimeColor} id="standard-basic" label="Custom Time eg.: 05:35" variant='standard' />
        </div>
        <div className="buttons">
        <Button disabled={inputDisabled} onClick={this.onTimerButtonClick} color="success" variant="contained">05:00</Button>
        <Button disabled={inputDisabled} onClick={this.onTimerButtonClick} color="success" variant="contained">10:00</Button>
        <Button disabled={inputDisabled} onClick={this.onTimerButtonClick} color="success" variant="contained">15:00</Button>
        </div>
      </Paper>
      <div className="media">
      <MediaControlCard onAudioStopButton={this.onAudioStopButton} onAudioPlayButton={this.onAudioPlayButton} audioControl={audioControl} />
      </div>
      </main>
      </div>
      <footer>
      </footer> 
    </div>
  );
}}

export default App;
