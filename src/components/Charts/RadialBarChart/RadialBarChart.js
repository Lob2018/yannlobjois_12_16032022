/** RadialBarChart.js */
import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import * as d3 from 'd3'

/**
 * The radial bar chart component
 * @component
 * @returns {React.ReactElement} The corresponding radial bar chart
 */
const RadialBarChart = ({ data = [], dimensions = {} }) => {
    // The ref will hold our component's SVG DOM element, it's initialized null
    const svgRef = useRef(null)
    const { width, height, margin } = dimensions
    const svgWidth = width + margin.left + margin.right
    const svgHeight = height + margin.top + margin.bottom

    useEffect(() => {
            var radius = Math.min(svgWidth, svgHeight) * 0.8

            // Create root container where we will append all other chart elements (current is the ref Get and Set)
            const svgEl = d3.select(svgRef.current)
            svgEl.selectAll('*').remove() // Clear svg content before adding new elements
            const svg = svgEl
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight)
                .append('g')
                .attr(
                    'transform',
                    'translate(' + svgWidth / 2 + ',' + svgHeight / 2 + ')'
                )

            // rest of counterclockwise version
            var value = -Math.PI * 2 * data[0].items
            var arc = d3
                .arc()
                .cornerRadius(25)
                .innerRadius(radius / 2.55)
                .outerRadius(radius / 2.3)
                .startAngle(value)
                .endAngle(0)

            svg.append('path').attr('class', 'arc').attr('d', arc).attr('fill', 'red')

            // Add title
            svg
                .append('text')
                .attr('x', -svgWidth / 2 + 24)
                .attr('y', -svgHeight / 2 + 30)
                .attr('font-weight', '500')
                .text('Score')
                // .style('text-anchor', 'middle')
                .attr('fill', '#20253A')
                .style('font-size', '15px')

            // Add value
            svg
                .append('text')
                .attr('x', 0)
                .attr('y', 0)
                .attr('font-weight', '700')
                .text(data[0].items * 100 + '%')
                .style('text-anchor', 'middle')
                .attr('fill', '#20253A')
                .style('font-size', '26px')

            // Add 1st line of text value
            svg
                .append('text')
                .attr('x', 0)
                .attr('y', 26)
                .attr('font-weight', '500')
                .text('de votre')
                .style('text-anchor', 'middle')
                .attr('fill', '#74798C')
                .style('font-size', '16px')
                // Add 2nd line of text value
            svg
                .append('text')
                .attr('x', 0)
                .attr('y', 52)
                .attr('font-weight', '500')
                .text('objectif')
                .style('text-anchor', 'middle')
                .attr('fill', '#74798C')
                .style('font-size', '16px')
        }, [
            data,
            height,
            margin,
            margin.bottom,
            margin.left,
            margin.top,
            svgHeight,
            svgWidth,
            width,
        ]) // Redraw chart if data or size changes

    return <svg ref = { svgRef }
    width = { svgWidth }
    height = { svgHeight }
    />
}

RadialBarChart.propTypes = {
    /**
     * Data is an object
     */
    data: PropTypes.object.isRequired,
    /**
     * Dimensions is an object
     */
    dimensions: PropTypes.object.isRequired,
}

RadialBarChart.defaultProps = {
    data: {},
    dimensions: {},
}

export default RadialBarChart