/** LineChart.js */
import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

import { svgRoundedRectanglePath } from '../../../utils/helper/svgRoundedRectanglePath'
import { getMinMaxObjectValueOfObjectInArray } from '../../../utils/helper/getMinMaxObjectValueOfObjectInArray'

const BarChart = ({ data = [], dimensions = {} }) => {
  // The ref will hold our component's SVG DOM element, it's initialized null
  const svgRef = useRef(null)
  const { width, height } = dimensions

  useEffect(() => {
    const thresholds = 80
    const xFormat = 'f'
    const yFormat = 'f'

    const xDomain = [
      getMinMaxObjectValueOfObjectInArray(data[0].items, 'day', -1),
      getMinMaxObjectValueOfObjectInArray(data[0].items, 'day', 0),
    ]
    let yDomainPoids = [
      getMinMaxObjectValueOfObjectInArray(data[0].items, 'kilogram', -1),
      getMinMaxObjectValueOfObjectInArray(data[0].items, 'kilogram', 0),
    ]
    const yDomainCal = [
      getMinMaxObjectValueOfObjectInArray(data[0].items, 'calories', -1),
      getMinMaxObjectValueOfObjectInArray(data[0].items, 'calories', 0),
    ]

    const rangePoids = yDomainPoids[1] - yDomainPoids[0]
    const ratioPoidsCal = rangePoids / yDomainCal[1]

    // Display rendering with max+1 and min-1
    yDomainPoids = [yDomainPoids[0] - 1, yDomainPoids[1] + 1]

    const ChartHeight = height * 0.5813
    const ChartWidth = width * 0.9132
    const chartMarginLeft = width * 0.0515
    const chartMarginRight = width * 0.0357
    const chartMarginTop = height * 0.1138
    const chartMarginBottom = height * 0.0275

    const xRangeBarsOptmized = [
      chartMarginLeft,
      ChartWidth - chartMarginRight - width * 0.0287,
    ]

    const xRangeTextOptmized = [
      chartMarginLeft + width * 0.01437,
      ChartWidth - chartMarginRight - width * 0.01437,
    ]

    const yRange = [ChartHeight - chartMarginBottom, chartMarginTop]

    const XPoids = d3.map(data[0].items, (d) => d.day)
    const XCal = d3.map(data[0].items, (d) => d.day + 0.2)
    const Y0Poids = d3.map(data[0].items, (d) => d.kilogram)
    const Y0Cal = d3.map(
      data[0].items,
      (d) => d.calories * ratioPoidsCal + yDomainPoids[0] + 1
    )
    const I = d3.range(XPoids.length)
    // Compute binsPoids.
    const binsPoids = d3
      .bin()
      .thresholds(thresholds)
      .value((i) => XPoids[i])(I)
    const YPoids = Array.from(binsPoids, (I) => d3.sum(I, (i) => Y0Poids[i]))
    // Compute binsCal.
    const binsCal = d3
      .bin()
      .thresholds(thresholds)
      .value((i) => XCal[i])(I)
    const YCal = Array.from(binsCal, (I) => d3.sum(I, (i) => Y0Cal[i]))

    // Construct scales and axes.
    // const xScale = d3.scaleLinear(xDomain, xRange)
    const xScaleText = d3.scaleLinear(xDomain, xRangeTextOptmized)
    const xScaleWeight = d3.scaleLinear(xDomain, xRangeBarsOptmized)
    const xScaleCal = d3.scaleLinear(xDomain, xRangeBarsOptmized)
    const yScale = d3.scaleLinear(yDomainPoids, yRange)
    const xAxis = d3
      .axisBottom(xScaleText)
      .ticks(data[0].items.length - 1, xFormat)
      .tickSizeOuter(0)
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(yDomainPoids[1] - yDomainPoids[0], yFormat)

    // Create root container where we will append all other chart elements (current is the ref Get and Set)
    const svgEl = d3.select(svgRef.current)
    svgEl.selectAll('*').remove() // Clear svg content before adding new elements

    // the legends's svg
    const svgLegend = svgEl
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('id', 'legend')
    // the title
    svgTextLegend(
      svgLegend,
      width * 0.0383,
      height * 0.125,
      '#20253A',
      'Activité quotidienne'
    )

    // bullets
    svgLegend
      .append('circle')
      .attr('r', width * 0.004790419)
      .style('fill', '#282D30')
      .attr('cx', width * 0.6371 + width * 0.004790419)
      .attr('cy', height * 0.125 - width * 0.004790419)
    svgLegend
      .append('circle')
      .attr('r', 4)
      .style('fill', '#E60000')
      .attr('cx', width * 0.7737 + width * 0.004790419)
      .attr('cy', height * 0.125 - width * 0.004790419)
    // bullet's legends
    svgTextLegend(
      svgLegend,
      width * 0.6587,
      height * 0.125,
      '#74798C',
      'Poids (kg)'
    )
    svgTextLegend(
      svgLegend,
      width * 0.7976,
      height * 0.125,
      '#74798C',
      'Calories brûlées (kCal)'
    )

    function svgTextLegend(svgGroup, x, y, filledColor, text) {
      svgGroup
        .append('text')
        .attr('x', x)
        .attr('y', y)
        .style('fill', filledColor)
        .style('font-family', 'Roboto')
        .style('font-weight', '500')
        .style('font-size', '15px')
        .text(text)
    }

    // the charts's svg
    const svgChart = svgEl
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('id', 'chart')
      .attr('y', height * 0.2969)
    // y text with lines
    svgChart
      .append('g')
      .attr('transform', `translate(${chartMarginLeft},0)`)
      .call(yAxis)
      .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .selectAll('.tick line')
          .attr(
            'x2',
            ChartWidth -
              chartMarginLeft -
              chartMarginRight +
              thresholds / data[0].items.length
          )
          .style('stroke-dasharray', '3')
          .attr('stroke', '#DEDEDE')
      )
      .call((g) =>
        g
          .selectAll('.tick text')
          .attr('transform', `translate(${ChartWidth},0)`)
          .attr('fill', '  #9B9EAC')
          .attr('font-weight', '500')
          .style('font-size', '14px')
      )

    // weight bars
    const weightBars = svgChart
      .selectAll('rect')
      .data(binsPoids)
      .join('rect')
      .attr('x', (d) => xScaleWeight(d.x0))
      .attr('width', (d) =>
        Math.max(0, xScaleWeight(d.x1) - xScaleWeight(d.x0))
      )
      .attr('y', (d, i) => yScale(YPoids[i]))
      .attr('height', (d, i) =>
        ChartHeight - chartMarginBottom - yScale(YPoids[i]) > 0
          ? ChartHeight - chartMarginBottom - yScale(YPoids[i])
          : 0
      )
    updateBarsWithTopRounded(
      weightBars,
      svgChart.append('g').attr('id', 'weightBars'),
      '#282D30',
      width * 0.006
    )

    // cal bars
    const calBars = svgChart
      .selectAll('rect')
      .data(binsCal)
      .join('rect')
      .attr('x', (d) => xScaleCal(d.x0))
      .attr('width', (d) => Math.max(0, xScaleCal(d.x1) - xScaleCal(d.x0)))
      .attr('y', (d, i) => yScale(YCal[i]))
      .attr('height', (d, i) =>
        ChartHeight - chartMarginBottom - yScale(YCal[i]) > 0
          ? ChartHeight - chartMarginBottom - yScale(YCal[i])
          : 0
      )

    updateBarsWithTopRounded(
      calBars,
      svgChart.append('g').attr('id', 'calBars'),
      '#E60000',
      width * 0.006
    )

    /**
     * Replaces a rectangle SVG group with a path SVG group corresponding to the rounded top borders
     * @param {object} oldGroupSVG - The old SVG group of rectangle
     * @param {object} newGroupSVG - The new SVG group of path
     * @param {string} color - The color of the path
     * @param {number} radius - The border radius
     */
    function updateBarsWithTopRounded(oldGroupSVG, newGroupSVG, color, radius) {
      oldGroupSVG._groups[0].forEach((el) => {
        if (el.attributes[3].value > 0) {
          const y = el.attributes[2].value
          const w = Math.round(el.attributes[1].value)
          const x = Math.round(el.attributes[0].value + 2 * w)
          const h = Math.round(el.attributes[3].value)
          newGroupSVG
            .append('path')
            .attr('d', () =>
              svgRoundedRectanglePath(x, y, w, h, radius, {
                tl: 1,
                tr: 1,
                br: 0,
                bl: 0,
              })
            )
            .attr('fill', color)
            .merge(newGroupSVG)
        }
      })
      // remove unused bars
      oldGroupSVG.remove()
    }

    // x text
    svgChart
      .append('g')
      .attr('transform', `translate(0,${ChartHeight - chartMarginBottom})`)
      .call(xAxis)
      .call((g) => g.select('.domain').attr('stroke', '#DEDEDE'))
      .call((g) => g.selectAll('.tick line').attr('y2', 0))
      .call((g) =>
        g
          .selectAll('.tick text')
          .attr(
            'transform',
            `translate(${width * 0.004790419},${chartMarginBottom})`
          )
          .attr('fill', '  #9B9EAC')
          .attr('font-weight', '500')
          .style('font-size', '14px')
      )
  }, [data, height, width]) // Redraw chart if data or size changes

  return <svg ref={svgRef} width={width} height={height} />
}

export default BarChart
