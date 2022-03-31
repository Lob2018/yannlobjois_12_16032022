/** LineChart.js */
import React from 'react'
import * as d3 from 'd3'

const LineChart = ({ data = [], dimensions = {} }) => {
  const svgRef = React.useRef(null)
  const { width, height, margin } = dimensions
  const svgWidth = width + margin.left + margin.right
  const svgHeight = height + margin.top + margin.bottom

  const dayDataSet = [
    { day: 'L' },
    { day: 'M' },
    { day: 'M' },
    { day: 'J' },
    { day: 'V' },
    { day: 'S' },
    { day: 'D' },
  ]

  console.log('LineChart-->' + JSON.stringify(data))

  React.useEffect(() => {
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
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current)
    svgEl.selectAll('*').remove() // Clear svg content before adding new elements
    const svg = svgEl
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
    // Add X grid lines with labels
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
  }, [data]) // Redraw chart if data changes

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />
}

export default LineChart
