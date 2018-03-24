import React, { Component } from 'react'
import { WindowSize } from 'react-fns'
import FitSVGTextRect from './FitSVGTextRect'

const App = () => (
  <WindowSize
    render={({ width, height }) => (
      <FitSVGTextRect width={width} height={height} text="Always keep smile" />
    )}
  />
)
export default App
