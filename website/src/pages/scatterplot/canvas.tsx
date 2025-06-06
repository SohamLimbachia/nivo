import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { ResponsiveScatterPlotCanvas, canvasDefaultProps } from '@nivo/scatterplot'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/scatterplot/meta.yml'
import mapper from '../../data/components/scatterplot/mapper'
import { groups } from '../../data/components/scatterplot/props'
import { generateHeavyDataSet } from '../../data/components/scatterplot/generator'

const initialProperties = {
    margin: {
        top: 60,
        right: 140,
        bottom: 70,
        left: 90,
    },
    xScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },
    xFormat: { format: '>-.2f', enabled: false },
    yScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },
    yFormat: { format: '>-.2f', enabled: false },
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,
    colors: canvasDefaultProps.colors,
    nodeSize: 5,
    axisTop: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
    },
    axisRight: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
    },
    axisBottom: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'weight',
        legendPosition: 'middle',
        legendOffset: 46,
        format: d => `${d} kg`,
    },
    axisLeft: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'size',
        legendPosition: 'middle',
        legendOffset: -60,
        format: d => `${d} cm`,
    },
    enableGridX: canvasDefaultProps.enableGridX,
    enableGridY: canvasDefaultProps.enableGridY,
    isInteractive: canvasDefaultProps.isInteractive,
    debugMesh: canvasDefaultProps.debugMesh,
    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 130,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 16,
            itemsSpacing: 3,
            itemDirection: 'left-to-right',
            symbolSize: 16,
            symbolShape: 'rect',
        },
    ],
}

const ScatterPlotCanvas = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/scatterplot-canvas.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="ScatterPlotCanvas"
            meta={meta.ScatterPlotCanvas}
            icon="scatterplot"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={canvasDefaultProps}
            propertiesMapper={mapper}
            generateData={generateHeavyDataSet}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => (
                <ResponsiveScatterPlotCanvas
                    {...properties}
                    data={data}
                    theme={theme}
                    ref={chartRef as Ref<HTMLCanvasElement>}
                    debounceResize={200}
                    onClick={node => {
                        logAction({
                            type: 'click',
                            label: `[node] id: ${node.id}, x: ${node.x}, y: ${node.y}`,
                            color: node.color,
                            data: node,
                        })
                    }}
                />
            )}
        </ComponentTemplate>
    )
}

export default ScatterPlotCanvas
