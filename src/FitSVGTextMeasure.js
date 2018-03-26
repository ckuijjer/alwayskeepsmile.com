import React, { Fragment } from 'react'
import getCompositions from './compositions'

import FitSVGText from './FitSVGText'

export default class FitSVGTextMeasure extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      zoom: 1,
      linesOfText: null,
      compositions: null,
    }
  }

  componentDidMount() {
    this.handleTextChanged()
    // this.handleRestOfChanges()
  }

  // componentWillReceiveProps(nextProps) {
  //   // todo: add other properties, and handle text change (don't do a thing on text change?)
  //   if (
  //     nextProps.width !== this.props.width ||
  //     nextProps.height !== this.props.height
  //   ) {
  //     this.handleRestOfChanges()
  //   }
  // }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      // the text has been changed and rendered
      this.handleTextChanged()
    }
  }

  handleTextChanged() {
    const { text } = this.props

    // - get the compositions
    // - get the bounding box of the text
    // - get the width of each of the words
    // - get the height of the text

    // find the indices where words are, e.g. "hi you" => [[0, 1], [3, 5]]
    const indices = this.findWordIndices(text)

    // create all possible ways this can be split into lines, e.g. [[[[[0, 1]], [[3, 5]]], [[0, 1], [3, 5]]]
    const compositions = getCompositions(indices)

    // const containerHeight = height
    // const containerWidth = width

    // based on the currently rendered element (but without the transform: scale)
    // and including spaces between the words (when you split over multiple lines spaces become less)
    // although with this.textElement.getSubStringLength it's all good
    const height = this.textElement.getBBox().height

    compositions.forEach(lines => {
      lines.forEach(words => {
        const startOfFirstWord = words[0][0]
        const endOfLastWord = words[words.length - 1][1]
        const numberOfCharacters = endOfLastWord - startOfFirstWord

        // based on the currently rendered element (but without the transform: scale)
        const width = this.textElement.getSubStringLength(
          startOfFirstWord,
          numberOfCharacters,
        )

        words.width = width
        // words.maximumHorizontalZoom = containerWidth / Math.ceil(width)
      })

      // const height = textHeight * lines.length

      lines.height = height * lines.length
      // lines.maximumVerticalZoom = containerHeight / Math.ceil(height)
      // lines.maximumHorizontalZoom = Math.min(
      //   ...lines.map(x => x.maximumHorizontalZoom),
      // )
      // lines.maximumZoom = Math.min(
      //   lines.maximumVerticalZoom,
      //   lines.maximumHorizontalZoom,
      // )
    })

    this.setState({
      compositions,
    })

    // compositions.sort((a, b) => b.maximumZoom - a.maximumZoom)
    // const best = compositions[0]

    // const nextState = {
    //   zoom: best.maximumZoom,
    //   linesOfText: best.map(words => {
    //     const startOfFirstWord = words[0][0]
    //     const endOfLastWord = words[words.length - 1][1]

    //     return text.substring(startOfFirstWord, endOfLastWord)
    //   }),
    // }

    // this.setState(nextState)
  }

  // handleRestOfChanges() {}

  findWordIndices = str => {
    const regex = /\w+/g

    const result = []
    let match
    while ((match = regex.exec(str))) {
      const start = match.index
      const end = start + match[0].length

      result.push([start, end])
    }

    return result
  }

  render() {
    const { width, height, text, ...restProps } = this.props

    let linesOfText = null
    let zoom = 1

    console.log(this.state.compositions)
    if (this.state.compositions) {
      // calculate the linesOfText
      // todo: this should be immutable
      this.state.compositions.forEach(lines => {
        lines.forEach(words => {
          words.maximumHorizontalZoom = width / Math.ceil(words.width)
        })
        lines.maximumVerticalZoom = height / Math.ceil(lines.height)
        lines.maximumHorizontalZoom = Math.min(
          ...lines.map(x => x.maximumHorizontalZoom),
        )
        lines.maximumZoom = Math.min(
          lines.maximumVerticalZoom,
          lines.maximumHorizontalZoom,
        )
      })

      this.state.compositions.sort((a, b) => b.maximumZoom - a.maximumZoom)
      const best = this.state.compositions[0]

      linesOfText = best.map(words => {
        const startOfFirstWord = words[0][0]
        const endOfLastWord = words[words.length - 1][1]

        return text.substring(startOfFirstWord, endOfLastWord)
      })
      zoom = best.maximumZoom
    }

    return (
      <Fragment>
        {linesOfText && (
          <FitSVGText
            {...restProps}
            width={width}
            height={height}
            linesOfText={linesOfText}
            zoom={zoom}
          />
        )}
        <text {...restProps} ref={c => (this.textElement = c)} stroke="#f99">
          {text}
        </text>
      </Fragment>
    )
  }
}
