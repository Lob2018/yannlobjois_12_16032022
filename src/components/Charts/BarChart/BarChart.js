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

    const chartHeight = height * 0.5813
    const chartWidth = width * 0.9132
    const chartMarginLeft = width * 0.0515
    const chartMarginRight = width * 0.0357
    const chartMarginTop = height * 0.1138
    const chartMarginBottom = height * 0.0275

    const xRangeBarsOptmized = [
      chartMarginLeft,
      chartWidth - chartMarginRight - width * 0.0287,
    ]

    const xRangeTextOptmized = [
      chartMarginLeft + width * 0.01437,
      chartWidth - chartMarginRight - width * 0.01437,
    ]

    const xRange = [
      chartMarginLeft,
      chartWidth - chartMarginRight + width * 0.01437,
    ]

    const yRange = [chartHeight - chartMarginBottom, chartMarginTop]

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
    const xScale = d3.scaleLinear(xDomain, xRange)
    const yScale = d3.scaleLinear(yDomainPoids, yRange)
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(data[0].items.length - 1, xFormat)
      .tickSizeOuter(0)
    const xAxisText = d3
      .axisBottom(xScaleText)
      .ticks(data[0].items.length - 1, xFormat)
      .tickSizeOuter(0)
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(yDomainPoids[1] - yDomainPoids[0], yFormat)

    // Create root container where we will append all other chart elements (current is the ref Get and Set)
    const svgEl = d3.select(svgRef.current)
    svgEl.selectAll('*').remove() // Clear svg content before adding new elements

    // Draws the background darkest color red for the selected value with opacity at 0
    svgEl
      .append('path')
      .attr('d', function (d) {
        return svgRoundedRectanglePath(
          0,
          0,
          chartWidth - chartMarginLeft - chartMarginRight,
          chartHeight - chartMarginBottom - chartMarginTop,
          0,
          {
            tl: 0,
            tr: 0,
            br: 0,
            bl: 0,
          }
        )
      })
      .attr('transform', `translate(-${chartMarginLeft},${chartMarginTop})`)
      .attr('id', 'background-activity-day-selected-change')
      .style('fill', '#C4C4C4')
      .attr('opacity', 0)

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
            chartWidth -
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
          .attr('transform', `translate(${chartWidth},0)`)
          .attr('fill', '  #9B9EAC')
          .attr('font-weight', '500')
          .style('font-size', '14px')
      )

    // weight bars
    svgChart
      .append('g')
      .attr('fill', '#282D30')
      .selectAll('path')
      .data(binsPoids)
      .join('path')
      .each(function (el, i) {
        if (el.length > 0) {
          d3.select(this).attr('d', () =>
            svgRoundedRectanglePath(
              Math.round(xScaleWeight(el.x0)),
              yScale(YPoids[i]),
              Math.round(
                Math.max(0, xScaleWeight(el.x1) - xScaleWeight(el.x0))
              ),
              chartHeight - chartMarginBottom - yScale(YPoids[i]) > 0
                ? Math.round(
                    chartHeight - chartMarginBottom - yScale(YPoids[i])
                  )
                : 0,
              width * 0.006,
              {
                tl: 1,
                tr: 1,
                br: 0,
                bl: 0,
              }
            )
          )
        } else d3.select(this).remove()
      })

    // cal bars
    svgChart
      .append('g')
      .attr('fill', '#E60000')
      .selectAll('path')
      .data(binsCal)
      .join('path')
      .each(function (el, i) {
        if (el.length > 0) {
          d3.select(this).attr('d', () =>
            svgRoundedRectanglePath(
              Math.round(xScaleCal(el.x0)),
              yScale(YCal[i]),
              Math.round(Math.max(0, xScaleCal(el.x1) - xScaleCal(el.x0))),
              chartHeight - chartMarginBottom - yScale(YCal[i]) > 0
                ? Math.round(chartHeight - chartMarginBottom - yScale(YCal[i]))
                : 0,
              width * 0.006,
              {
                tl: 1,
                tr: 1,
                br: 0,
                bl: 0,
              }
            )
          )
        } else d3.select(this).remove()
      })

    // x for text
    svgChart
      .append('g')
      .attr('transform', `translate(0,${chartHeight - chartMarginBottom})`)
      .call(xAxisText)
      .call((g) => g.select('.domain').attr('opacity', 0))
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

    // x for domain line
    svgChart
      .append('g')
      .attr('transform', `translate(0,${chartHeight - chartMarginBottom})`)
      .call(xAxis)
      .call((g) => g.select('.domain').attr('stroke', '#DEDEDE'))
      .call((g) => g.selectAll('.tick line').attr('y2', 0))
      .call((g) => g.selectAll('.tick text').attr('opacity', 0))

    /**
     * TOOLTIP
     */
    // Draws the tooltip and a mouse listener
    var tooltip = addTooltip()
    var bisectDate = d3.bisector((d) => d.day).center
    svgChart
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
        d3.select('#background-activity-day-selected-change').attr('opacity', 0)
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
      var tooltipGroup = svgChart
        .append('g')
        .attr('id', 'tooltip')
        .style('display', 'none')
      // Draw tooltip's background
      tooltipGroup
        .append('rect')
        .attr('width', 39)
        .attr('height', 25)
        .style('fill', '#FFF')
        .style('stroke', '#FFF')
        .style('stroke-width', '1')
        .attr('transform', 'translate(-19.5, 0)')
        .attr('id', 'tooltip-container-weight-calorie')
      // Draw the text container
      var text = tooltipGroup
        .append('text')
        .attr('font-size', '8px')
        .attr('font-weight', '500')
        .style('color', '#000')
        .attr('text-anchor', 'middle')
        .style('fill', '#000')
        .attr('transform', 'translate(0, 0)')
        .attr('id', 'tooltip-text-container-weight-calorie')
      // Draw the text for the average session value found
      text
        .append('tspan')
        .attr('id', 'tooltip-text-weight-calorie')
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
      d3.select('#tooltip-text-weight-calorie').text(
        sessionLengthValue + ' min'
      )
      if (i === 0) {
        d3.select('#tooltip-container-weight-calorie').attr(
          'transform',
          'translate(19.5, -43)'
        )
        d3.select('#tooltip-text-container-weight-calorie').attr(
          'transform',
          'translate(39, -28)'
        )
      } else if (i === 6) {
        d3.select('#tooltip-container-weight-calorie').attr(
          'transform',
          'translate(-58.5, -43)'
        )
        d3.select('#tooltip-text-container-weight-calorie').attr(
          'transform',
          'translate(-39, -28)'
        )
      } else {
        d3.select('#tooltip-container-weight-calorie').attr(
          'transform',
          'translate(-19.5, -43)'
        )
        d3.select('#tooltip-text-container-weight-calorie').attr(
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
      const bgPath = d3.select('#background-activity-day-selected-change')
      bgPath
        .attr('d', function () {
          return svgRoundedRectanglePath(
            x + chartWidth / 24 / 2,
            chartMarginTop,
            chartWidth / 12,
            chartHeight,
            0,
            {
              tl: 0,
              tr: 0,
              br: 0,
              bl: 0,
            }
          )
        })
        .attr('opacity', x > chartWidth ? 0 : 1)
        .merge(bgPath)
    }

    /**
     * The mouse's listener to position the tooltip with the darkest background
     * @function
     * @memberof LineChart
     * @param {object} event - The mouse event
     */
    function mousemove(event) {
      // Tooltip
      var x0 = xScaleText.invert(d3.pointer(event)[0]),
        i = bisectDate(data[0].items, x0),
        d = data[0].items[i]
      const x = xScaleText(d.day)
      //   const y = yScale(d.day)

      tooltip.attr('transform', 'translate(' + x + ',' + chartMarginTop + ')')
      updateTooltipValue(i, d.kilogram + ' ' + d.calories)
      // Darkest background
      updateDarkestBackgroundWidth(x)
    }
  }, [data, height, width]) // Redraw chart if data or size changes
  return <svg ref={svgRef} width={width} height={height} />
}

export default BarChart
