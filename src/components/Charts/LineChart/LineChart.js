/** LineChart.js */
import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

import { svgRoundedRectanglePath } from '../../../utils/helper/svgRoundedRectanglePath'

const LineChart = ({ data = [], dimensions = {} }) => {
  // The ref will hold our component's SVG DOM element, it's initialized null
  const svgRef = useRef(null)
  const { width, height, margin } = dimensions
  const svgWidth = width + margin.left + margin.right
  const svgHeight = height + margin.top + margin.bottom

  useEffect(() => {
    // X axis's labels
    const dayDataSet = [
      { day: 'L' },
      { day: 'M' },
      { day: 'M' },
      { day: 'J' },
      { day: 'V' },
      { day: 'S' },
      { day: 'D' },
    ]

    // Transform data values into visual variables
    const xScaleText = d3
      .scaleLinear()
      .domain([1, 7])
      .range([15, width - 15])
    const xScale = d3
      .scaleLinear()
      .domain([1, 7])
      .range([-1, width + 1])
    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(data[0].items, (d) => d.sessionLength) - 20,
        d3.max(data[0].items, (d) => d.sessionLength) + 30,
      ])
      .range([height, 0])

    // Create root container where we will append all other chart elements (current is the ref Get and Set)
    const svgEl = d3.select(svgRef.current)
    svgEl.selectAll('*').remove() // Clear svg content before adding new elements
    const svg = svgEl
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Draws the background color red
    svg
      .append('path')
      .attr('d', function (d) {
        return svgRoundedRectanglePath(0, 0, svgWidth, svgHeight, 5, {
          tl: 1,
          tr: 1,
          br: 1,
          bl: 1,
        })
      })
      .attr('transform', `translate(-${margin.left},-${margin.top})`)
      .style('fill', '#F00')
    // Draws the background darkest color red for the selected value with opacity at 0
    svg
      .append('path')
      .attr('d', function (d) {
        return svgRoundedRectanglePath(0, 0, svgWidth, svgHeight, 5, {
          tl: 0,
          tr: 1,
          br: 1,
          bl: 0,
        })
      })
      .attr('transform', `translate(-${margin.left},-${margin.top})`)
      .attr('id', 'background-day-selected-change')
      .style('fill', '#ea010b')
      .attr('opacity', 0)

    // Draws the x axis labels modified
    const xAxis = d3
      .axisBottom(xScaleText)
      .tickFormat(function (d) {
        return dayDataSet[d - 1].day
      })
      .ticks(8)
      .tickSize(-height + margin.bottom)
    const xAxisGroup = svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
    xAxisGroup.select('.domain').remove()
    xAxisGroup.selectAll('line').attr('stroke', 'rgba(255, 255, 255, 0)')
    xAxisGroup
      .selectAll('text')
      .attr('opacity', 0.7)
      .attr('color', 'white')
      .attr('font-size', '0.75rem')
      .attr('font-weight', '500')

    // Create the rounded chart's line values
    const line = d3
      .line()
      .x((d) => xScale(d.day))
      .y((d) => yScale(d.sessionLength))
      .curve(d3.curveCardinal)

    // Create the line's gradient
    const linearGradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'linear-gradient')
      .attr('gradientTransform', 'rotate(0)')
    linearGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#FFF')
      .attr('stop-opacity', '0.7')
    linearGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#FFF')
      .attr('stop-opacity', '1')
    // Draws the rounded chart's line with the gradient
    svg
      .selectAll('.line')
      .data(data)
      .enter()
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', (d) => d.color)
      .attr('stroke-width', 3)
      .attr('stroke', 'url(#linear-gradient)')
      .attr('d', (d) => line(d.items))

    // Draws the title 1st line
    svg
      .append('text')
      .attr('opacity', 0.7)
      .attr('x', 30)
      .attr('y', 15)
      .attr('text-anchor', 'left')
      .style('fill', '#FFF')
      .style('font-family', 'Roboto')
      .style('font-weight', '500')
      .style('font-size', '15px')
      .text('Durée moyenne des')
    // Draws the title 2nd line
    svg
      .append('text')
      .attr('opacity', 0.7)
      .attr('x', 30)
      .attr('y', 38)
      .attr('text-anchor', 'left')
      .style('fill', '#FFF')
      .style('font-family', 'Roboto')
      .style('font-weight', '500')
      .style('font-size', '15px')
      .text('sessions')

    // Draws the tooltip and a mouse listener
    var tooltip = addTooltip()
    var bisectDate = d3.bisector((d) => d.day).center
    svg
      .append('rect')
      .attr('opacity', '0')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', function (event) {
        tooltip.style('display', 'block')
      })
      .on('mouseout', function (event) {
        tooltip.style('display', 'none')
        // Hide the background
        d3.select('#background-day-selected-change').attr('opacity', 0)
      })
      .on('mousemove', mousemove)

    /**
     * Create the tooltip (with the circle for the value position)
     * @function
     * @memberof LineChart
     * @returns {object} - The svg of the tooltip
     */
    function addTooltip() {
      // Creating a group that will contain the entire tooltip plus the tracking circle
      var tooltipGroup = svg
        .append('g')
        .attr('id', 'tooltip')
        .style('display', 'none')
      // Draw the transparent white outer circle
      tooltipGroup
        .append('circle')
        .attr('opacity', 0.3)
        .attr('fill', '#FFF')
        .attr('r', 15)
      // Draw the white inner circle
      tooltipGroup
        .append('circle')
        .attr('fill', '#FFF')
        .attr('stroke', '#fff')
        .attr('stroke-width', '1.5px')
        .attr('r', 5)
      // Draw tooltip's background
      tooltipGroup
        .append('rect')
        .attr('width', 39)
        .attr('height', 25)
        .style('fill', '#FFF')
        .style('stroke', '#FFF')
        .style('stroke-width', '1')
        .attr('transform', 'translate(-19.5, -43)')
        .attr('id', 'tooltip-container-sessionLength')
      // Draw the text container
      var text = tooltipGroup
        .append('text')
        .attr('font-size', '8px')
        .attr('font-weight', '500')
        .style('color', '#000')
        .attr('text-anchor', 'middle')
        .style('fill', '#000')
        .attr('transform', 'translate(0, -28)')
        .attr('id', 'tooltip-text-container-sessionLength')
      // Draw the text for the average session value found
      text
        .append('tspan')
        .attr('id', 'tooltip-text-sessionLength')
        .style('font-weight', 'bold')
      return tooltipGroup
    }

    /**
     * Update the tooltip text position for the first and the last values
     * @function
     * @memberof LineChart
     * @param {number} i - The x axis day (0-6)
     * @param {string} sessionLengthValue -The updated session's length value
     */
    function updateTooltipValue(i, sessionLengthValue) {
      d3.select('#tooltip-text-sessionLength').text(sessionLengthValue + ' min')
      if (i === 0) {
        d3.select('#tooltip-container-sessionLength').attr(
          'transform',
          'translate(19.5, -43)'
        )
        d3.select('#tooltip-text-container-sessionLength').attr(
          'transform',
          'translate(39, -28)'
        )
      } else if (i === 6) {
        d3.select('#tooltip-container-sessionLength').attr(
          'transform',
          'translate(-58.5, -43)'
        )
        d3.select('#tooltip-text-container-sessionLength').attr(
          'transform',
          'translate(-39, -28)'
        )
      } else {
        d3.select('#tooltip-container-sessionLength').attr(
          'transform',
          'translate(-19.5, -43)'
        )
        d3.select('#tooltip-text-container-sessionLength').attr(
          'transform',
          'translate(0, -28)'
        )
      }
    }

    /**
     * Update the darkest colorred background's width with the selected day
     * @function
     * @memberof LineChart
     * @param {number} x - The x current position in pixels for the day selected
     */
    function updateDarkestBackgroundWidth(x) {
      const bgPath = d3.select('#background-day-selected-change')
      bgPath
        .attr('d', function () {
          return svgRoundedRectanglePath(
            x + 1.5,
            0,
            svgWidth - x - 1.5,
            svgHeight,
            5,
            {
              tl: x < 0 ? 1 : 0,
              tr: 1,
              br: 1,
              bl: x < 0 ? 1 : 0,
            }
          )
        })
        .attr('opacity', x > svgWidth ? 0 : 1)
        .merge(bgPath)
    }

    /**
     * The mouse's listener to position the tooltip with the darkest background
     * @function
     * @memberof LineChart
     * @param {object} event - The mouse event
     */
    function mousemove(event) {
      console.log(typeof event)
      // Tooltip
      var x0 = xScaleText.invert(d3.pointer(event)[0]),
        i = bisectDate(data[0].items, x0),
        d = data[0].items[i]
      const x = xScale(d.day)
      const y = yScale(d.sessionLength)
      tooltip.attr('transform', 'translate(' + x + ',' + y + ')')
      updateTooltipValue(i, d.sessionLength)
      // Darkest background
      updateDarkestBackgroundWidth(x)
    }
  }, [
    data,
    height,
    margin.bottom,
    margin.left,
    margin.top,
    svgHeight,
    svgWidth,
    width,
  ]) // Redraw chart if data or size changes

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />
}

export default LineChart
