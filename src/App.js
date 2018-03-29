import React, { Component } from 'react'
import { WindowSize } from 'react-fns'
import FitSVGTextRect from './FitSVGTextRect'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-116657207-1')
ReactGA.pageview('/')

const App = () => (
  <WindowSize
    render={({ width, height }) => (
      <FitSVGTextRect width={width} height={height} text="Always keep smile" />
    )}
  />
)

export default App
