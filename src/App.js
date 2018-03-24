import React, { Component } from 'react'
import { WindowSize } from 'react-fns'
import FitSVGTextRect from './FitSVGTextRect'

class App extends Component {
  render() {
    return (
      <div className="App">
        <WindowSize
          render={({ width, height }) => (
            <FitSVGTextRect
              width={width}
              height={height}
              text="Always keep smile"
            />
          )}
        />
      </div>
    )
  }
}

export default App
