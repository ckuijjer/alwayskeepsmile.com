import React, { Component } from 'react'
import { WindowSize } from 'react-fns'
import FitSVGTextRect from './FitSVGTextRect'

class App extends Component {
  state = {
    text: 'One two three',
  }

  onChange = e => {
    this.setState({ text: e.target.value || '' })
  }

  render() {
    return (
      <div>
        <input value={this.state.text} onChange={this.onChange} />
        <WindowSize
          render={({ width, height }) => (
            <FitSVGTextRect
              width={width}
              height={height}
              text={this.state.text}
            />
          )}
        />
      </div>
    )
  }
}

export default App
