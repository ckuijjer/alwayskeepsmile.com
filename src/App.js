import React, { Component } from 'react'
import { WindowSize } from 'react-fns'
import FitSVGText from 'fit-svg-text'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-116657207-1')
ReactGA.pageview('/')

const App = () => (
  <WindowSize
    render={({ width, height }) => (
      <FitSVGText width={width} height={height} text="Always keep smile" />
    )}
  />
)

export default App
