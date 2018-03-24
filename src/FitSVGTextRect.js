import React from 'react'
import FitSVGText from './FitSVGText'

const FitSVGTextRect = ({
  width,
  height,
  text,
  backgroundColor = '#fff',
  color = '#000',
}) => (
  <svg width={width} height={height}>
    <g>
      <rect x="0" y="0" width={width} height={height} fill={backgroundColor} />
      <FitSVGText
        x="0"
        y="0"
        stroke={color}
        dy="1em"
        width={width}
        height={height}
      >
        {text}
      </FitSVGText>
    </g>
  </svg>
)

export default FitSVGTextRect
