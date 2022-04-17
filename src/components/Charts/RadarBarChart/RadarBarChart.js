/** RadarBarChart.js */
import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

import { svgRoundedRectanglePath } from '../../../utils/helper/svgRoundedRectanglePath'
import { getMinMaxObjectValueOfObjectInArray } from '../../../utils/helper/getMinMaxObjectValueOfObjectInArray'

const RadarBarChart = ({ data = [], dimensions = {} }) => {
  // The ref will hold our component's SVG DOM element, it's initialized null
  const svgRef = useRef(null)
  const { width, height, margin } = dimensions
  const svgWidth = width + margin.left + margin.right
  const svgHeight = height + margin.top + margin.bottom

  useEffect(() => {
    // NUM_OF_SIDES = The number of sides of our polygon.
    // NUM_OF_LEVEL = The number of levels we want.
    // size = The width and height of our SVG wrapper.
    // polyangle = size of the angle created at the center of the drawing area by each polygon side. The sum of angles at a point is 360 degrees or 2 * Math.PI radians. For a regular polygon, ( i.e the length of all sides of the polygon are equal ) each side would create an angle of size 2 * Math.PI / NUM_OF_SIDES radians .
    // offset = Our polygon start at the top, like a clock. So we need to shift our points by this angle.
    // r = Distance between center and edge of the drawing area.
    // r_0 = Give a little gap between our chart area and the edge of the drawing area
    // center = The middle of our drawing area.

    const NUM_OF_SIDES = 6
    const size = Math.min(svgWidth, svgHeight),
      offset = Math.PI,
      polyangle = (Math.PI * 2) / NUM_OF_SIDES,
      r = 0.615 * size,
      r_0 = r / 2,
      center = {
        x: svgWidth < 270 ? (svgWidth - 3) / 2 : svgWidth / 2,
        y: (height - 15) / 2,
      }

    // Get the maximum value to calculate the percentage
    const calcMax = getMinMaxObjectValueOfObjectInArray(
      data[0].items.performance_data,
      'value',
      1
    )

    // Create root container where we will append all other chart elements (current is the ref Get and Set)
    const svgEl = d3.select(svgRef.current)
    svgEl.selectAll('*').remove() // Clear svg content before adding new elements
    const svg = svgEl
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Draws the background color red
    svg
      .append('path')
      .attr('d', function () {
        return svgRoundedRectanglePath(0, 0, svgWidth, svgHeight, 5, {
          tl: 1,
          tr: 1,
          br: 1,
          bl: 1,
        })
      })
      .attr('transform', `translate(-${margin.left},-${margin.top})`)
      .style('fill', '#282D30')

    const dataset = getDataUpdated(NUM_OF_SIDES)
    const scale = d3.scaleLinear().domain([0, 100]).range([0, r_0]).nice()

    generateAndDrawLevels(NUM_OF_SIDES)
    drawData(dataset, NUM_OF_SIDES)
    drawLabels(dataset, NUM_OF_SIDES)

    /**
     * Get the data prepared for this chart
     * @function
     * @memberof RadarBarChart
     * @param {*} length - The number of sides
     * @returns {object} - The data prepared
     */
    function getDataUpdated(length) {
      const dataUpdated = []
      const translatedText = [
        'cardio',
        'energie',
        'endurance',
        'force',
        'vitesse',
        'intensité',
      ]
      for (let i = 0; i < length; i++) {
        const text = data[0].items.performance_kind[i + 1]
        dataUpdated.unshift({
          name:
            translatedText[i].charAt(0).toUpperCase() +
            translatedText[i].slice(1),
          value: (data[0].items.performance_data[i].value / calcMax) * 100,
        })
      }
      return dataUpdated
    }

    /**
     * Generate a point from an angle with a specified length
     * @function
     * @memberof RadarBarChart
     * @param {object} param0 - The object containing the length and angle values
     * @returns {object} - The corresponding point
     */
    function generatePoint({ length, angle }) {
      return {
        x: center.x + length * Math.sin(offset - angle),
        y: center.y + length * Math.cos(offset - angle),
      }
    }

    /**
     * Draws an SVG path inside a parent SVG
     * @function
     * @memberof RadarBarChart
     * @param {array} points - The closed shape point array
     * @param {*} parent - The SVG paarent
     */
    function drawPath(points, parent) {
      const lineGenerator = d3
        .line()
        .x((d) => d.x)
        .y((d) => d.y)
      parent.append('path').attr('d', lineGenerator(points))
    }

    /**
     * Draws the levels in SVG (5 levels)
     * @function
     * @memberof RadarBarChart
     * @param {*} levelsCount - The number of levels
     * @param {*} sideCount - The number of sides
     */
    function generateAndDrawLevels(sideCount) {
      for (let level = 0.125; level <= 1; level *= 2) {
        let hyp = level * r_0
        const points = []
        for (let vertex = 0; vertex < sideCount; vertex++) {
          const theta = vertex * polyangle

          points.push(generatePoint({ length: hyp, angle: theta }))
        }
        const group = svg
          .append('g')
          .attr('class', 'levels')
          .style('stroke', '#FFF')
          .style('stroke-width', '1')
          .style('fill-opacity', '0')
        drawPath([...points, points[0]], group)
        if (level === 1) level = 0.375
      }
    }

    /**
     * Draws an SVG text in a parent SVG, at a certain position
     * @function
     * @memberof RadarBarChart
     * @param {string} text - The text
     * @param {array} point - The position of the text in pixels
     * @param {object} group - The parent group of SVG
     */
    function drawText(text, point, group) {
      group
        .append('text')
        .attr('x', point.x)
        .attr('y', point.y)
        .attr('font-weight', '500')
        .text(text)
        .style('text-anchor', 'middle')
        .attr('fill', 'white')
        .style('font-size', '12px')
    }

    /**
     * Draws the SVG data shape
     * @function
     * @memberof RadarBarChart
     * @param {*} dataset0 - The array with the user's performances data
     * @param {*} n - The number of sides
     */
    function drawData(dataset0, n) {
      const points = []
      dataset0.forEach((d, i) => {
        const len = scale(d.value)
        const theta = i * ((2 * Math.PI) / n)

        points.push({
          ...generatePoint({ length: len, angle: theta }),
          value: d.value,
        })
      })
      const group = svg
        .append('g')
        .attr('class', 'shape')
        .style('fill', '#FF0101')
        .attr('opacity', 0.7)
      drawPath([...points, points[0]], group)
    }

    /**
     * Draws the labels
     * @function
     * @memberof RadarBarChart
     * @param {*} dataset1 - The array with the user's performances data
     * @param {*} sideCount - The number of sides
     */
    function drawLabels(dataset1, sideCount) {
      const groupL = svg.append('g').attr('class', 'labels')
      for (let vertex = 0; vertex < sideCount; vertex++) {
        const angle = vertex * polyangle
        const label = dataset1[vertex].name
        let optimizedLength = 0.47
        if (vertex === 0) {
          optimizedLength = optimizedLength / 1.14
        } else if (vertex === 3) {
          optimizedLength = optimizedLength / 1.08
        }
        optimizedLength = optimizedLength * 0.92
        const point = generatePoint({ length: optimizedLength * size, angle })
        if (vertex === 1) point.y = point.y + 18
        if (vertex === 2 || vertex === 4) point.y = point.y - 3.5
        if (vertex === 2) point.x = point.x - 5
        if (vertex === 5) point.y = point.y + 18
        drawText(label, point, groupL)
      }
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

export default RadarBarChart
