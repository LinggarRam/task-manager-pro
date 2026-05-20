import { Component } from "react";
import PropTypes from "prop-types";
import "../styles/Timer.css";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsLeft: props.initialSeconds || 1500,
      isRunning: false,
      mode: "work",
    };
    this.interval = null;
  }

  componentDidMount() {
    console.log("Timer Mounted");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.secondsLeft > 0 && this.state.secondsLeft === 0) {
      this.handleTimerEnd();
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    console.log("Timer Unmounted, interval cleared");
  }

  handleTimerEnd = () => {
    clearInterval(this.interval);
    this.interval = null;

    const newMode = this.state.mode === "work" ? "break" : "work";
    const newSeconds = newMode === "work" ? 1500 : 300;

    this.setState({
      isRunning: false,
      mode: newMode,
      secondsLeft: newSeconds,
    });

    if (this.props.onComplete) {
      this.props.onComplete(this.state.mode);
    }
  };

  start = () => {
    if (this.state.isRunning) return;
    this.setState({ isRunning: true });
    this.interval = setInterval(() => {
      this.setState((prev) => ({
        secondsLeft: Math.max(0, prev.secondsLeft - 1),
      }));
    }, 1000);
  };

  pause = () => {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({ isRunning: false });
  };

  reset = () => {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({
      isRunning: false,
      secondsLeft: this.state.mode === "work" ? 1500 : 300,
    });
  };

  formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  render() {
    const { secondsLeft, isRunning, mode } = this.state;
    const progress =
      mode === "work"
        ? ((1500 - secondsLeft) / 1500) * 100
        : ((300 - secondsLeft) / 300) * 100;

    return (
      <div className={`timer ${mode}`}>
        <div className="timer-mode">
          {mode === "work" ? "🍅 Focus Time" : "☕ Break Time"}
        </div>

        <div className="timer-display">
          <svg className="timer-ring" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" className="timer-ring-bg" />
            <circle
              cx="60"
              cy="60"
              r="54"
              className="timer-ring-progress"
              style={{
                strokeDasharray: `${2 * Math.PI * 54}`,
                strokeDashoffset: `${2 * Math.PI * 54 * (1 - progress / 100)}`,
              }}
            />
          </svg>

          <span className="timer-time">{this.formatTime(secondsLeft)}</span>
        </div>

        <div className="timer-controls">
          {!isRunning ? (
            <button className="timer-btn start" onClick={this.start}>
              ▶ Start
            </button>
          ) : (
            <button className="timer-btn pause" onClick={this.pause}>
              ⏸ Pause
            </button>
          )}
          <button className="timer-btn reset" onClick={this.reset}>
            ↺ Reset
          </button>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  initialSeconds: PropTypes.number,
  onComplete: PropTypes.func,
};

export default Timer;
