/** LineChart.js */
import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const LineChart = ({ data = [], dimensions = {} }) => {
  // The ref will hold our component's SVG DOM element, it's initialized null
  const svgRef = useRef(null)
  const { width, height, margin } = dimensions
  const svgWidth = width + margin.left + margin.right
  const svgHeight = height + margin.top + margin.bottom

  useEffect(() => {
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
        d3.min(data[0].items, (d) => d.sessionLength) - 15,
        d3.max(data[0].items, (d) => d.sessionLength) + 30,
      ])
      .range([height, 0])
    // The ref Get and Set - Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current)
    svgEl.selectAll('*').remove() // Clear svg content before adding new elements
    const svg = svgEl
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Background rounded
    function roundedRect(x, y, w, h, r, tl, tr, bl, br) {
      var retval
      retval = 'M' + (x + r) + ',' + y
      retval += 'h' + (w - 2 * r)
      if (tr) {
        retval += 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + r
      } else {
        retval += 'h' + r
        retval += 'v' + r
      }
      retval += 'v' + (h - 2 * r)
      if (br) {
        retval += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + r
      } else {
        retval += 'v' + r
        retval += 'h' + -r
      }
      retval += 'h' + (2 * r - w)
      if (bl) {
        retval += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + -r
      } else {
        retval += 'h' + -r
        retval += 'v' + -r
      }
      retval += 'v' + (2 * r - h)
      if (tl) {
        retval += 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + -r
      } else {
        retval += 'v' + -r
        retval += 'h' + r
      }
      retval += 'z'
      return retval
    }

    // svgEl.attr('id', 'svg-AverageSessionsData')
    svg
      .append('path')
      .attr('d', function (d) {
        return roundedRect(0, 0, svgWidth, svgHeight, 5, 1, 1, 1, 1)
      })
      .attr('transform', `translate(-${margin.left},-${margin.top})`)
      .style('fill', '#F00')

    // Add X grid lines with modified labels
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

    const line = d3
      .line()
      .x((d) => xScale(d.day))
      .y((d) => yScale(d.sessionLength))
      .curve(d3.curveMonotoneX)

    // Line's gradient
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

    // Title
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
    // Continuation of the title
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

    // Tooltip
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
      })
      .on('mousemove', mousemove)

    function addTooltip() {
      // Creating a group that will contain the entire tooltip plus the tracking circle
      var tooltipInAdd = svg
        .append('g')
        .attr('id', 'tooltip')
        .style('display', 'none')

      // The transparent white outer circle
      tooltipInAdd
        .append('circle')
        .attr('opacity', 0.3)
        .attr('fill', '#FFF')
        .attr('r', 15)

      // The white inner circle
      tooltipInAdd
        .append('circle')
        .attr('fill', '#FFF')
        .attr('stroke', '#fff')
        .attr('stroke-width', '1.5px')
        .attr('r', 5)

      // The tooltip
      tooltipInAdd
        .append('rect')
        .attr('width', 39)
        .attr('height', 25)
        .style('fill', '#FFF')
        .style('stroke', '#FFF')
        .style('stroke-width', '1')
        .attr('transform', 'translate(-19.5, -43)')
        .attr('id', 'tooltip-container-sessionLength')

      // This element will contain all our text
      var text = tooltipInAdd
        .append('text')
        .attr('font-size', '8px')
        .attr('font-weight', '500')
        .style('color', '#000')
        .attr('text-anchor', 'middle')
        .style('fill', '#000')
        .attr('transform', 'translate(0, -28)')
        .attr('id', 'tooltip-text-container-sessionLength')
      // The text for the average session value found
      text
        .append('tspan')
        .attr('id', 'tooltip-text-sessionLength')
        .style('font-weight', 'bold')
      return tooltipInAdd
    }

    //Update the tooltip value and improve his position (first and last)
    function updateTooltipValue(i, d) {
      d3.select('#tooltip-text-sessionLength').text(d.sessionLength + ' min')
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

    function mousemove(event) {
      var x0 = xScaleText.invert(d3.pointer(event)[0]),
        i = bisectDate(data[0].items, x0),
        d = data[0].items[i]

      console.log('i:' + i)
      console.log('*->' + JSON.stringify(d))
      console.log(
        'x=' + xScaleText(d.day) + '   -   y=' + yScale(d.sessionLength)
      )
      tooltip.attr(
        'transform',
        'translate(' + xScale(d.day) + ',' + yScale(d.sessionLength) + ')'
      )

      updateTooltipValue(i, d)
    }
  }, [data, height, margin.bottom, margin.left, margin.top, width]) // Redraw chart if data or size changes

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />
}

export default LineChart
