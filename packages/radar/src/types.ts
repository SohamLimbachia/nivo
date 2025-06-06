import { FunctionComponent, AriaAttributes, MouseEvent } from 'react'
import { AnimatedProps } from '@react-spring/web'
import {
    Box,
    CssMixBlendMode,
    Dimensions,
    MotionProps,
    PropertyAccessor,
    ValueFormat,
    ClosedCurveFactoryId,
    DotsItemSymbolComponent,
    SvgDefsAndFill,
} from '@nivo/core'
import { PartialTheme } from '@nivo/theming'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'
import { ScaleLinear } from 'd3-scale'

export interface RadarDataProps<D extends Record<string, unknown>> {
    data: readonly D[]
    keys: readonly string[]
    indexBy: PropertyAccessor<D, string>
}

export interface GridLabelProps {
    id: string
    anchor: 'start' | 'middle' | 'end'
    angle: number
    x: number
    y: number
    animated: AnimatedProps<{
        transform: string
    }>
}
export type GridLabelComponent = FunctionComponent<GridLabelProps>

export type PointData = {
    index: string
    key: string
    value: number
    formattedValue: string
    color: string
}

export interface PointProps {
    key: string
    label: string | number | undefined
    data: PointData
    style: {
        fill: string
        stroke: string
        x: number
        y: number
    }
}

export interface RadarSliceTooltipDatum {
    color: string
    id: string
    value: number
    formattedValue: string
}

export interface RadarSliceTooltipProps {
    index: string | number
    data: readonly RadarSliceTooltipDatum[]
}
export type RadarSliceTooltipComponent = FunctionComponent<RadarSliceTooltipProps>

export interface RadarCustomLayerProps<D extends Record<string, unknown>> {
    data: readonly D[]
    keys: readonly string[]
    indices: readonly string[] | readonly number[]
    colorByKey: RadarColorMapping
    centerX: number
    centerY: number
    radiusScale: ScaleLinear<number, number>
    angleStep: number
}
export type RadarCustomLayer<D extends Record<string, unknown>> = FunctionComponent<
    RadarCustomLayerProps<D>
>

export type RadarLayerId = 'grid' | 'layers' | 'slices' | 'dots' | 'legends'

export type RadarColorMapping = Record<string, string>

export interface RadarCommonProps<D extends Record<string, unknown>> {
    maxValue: number | 'auto'
    valueFormat: ValueFormat<number, string>
    rotation: number
    layers: readonly (RadarLayerId | RadarCustomLayer<D>)[]
    margin: Box
    curve: ClosedCurveFactoryId
    gridLevels: number
    gridShape: 'circular' | 'linear'
    gridLabel: GridLabelComponent
    gridLabelOffset: number
    enableDots: boolean
    dotSymbol: DotsItemSymbolComponent
    dotSize: number
    dotColor: InheritedColorConfig<PointData>
    dotBorderWidth: number
    dotBorderColor: InheritedColorConfig<PointData>
    enableDotLabel: boolean
    dotLabel: PropertyAccessor<PointData, string | number>
    dotLabelFormat: ValueFormat<number>
    dotLabelYOffset: number
    theme: PartialTheme
    colors: OrdinalColorScaleConfig<{ key: string; index: number }>
    fillOpacity: number
    blendMode: CssMixBlendMode
    borderWidth: number
    borderColor: InheritedColorConfig<{ key: string; color: string }>
    isInteractive: boolean
    sliceTooltip: RadarSliceTooltipComponent
    renderWrapper: boolean
    legends: readonly LegendProps[]
    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
}

export interface RadarSvgFillMatcherDatum<D extends Record<string, unknown>> {
    color: string
    data: RadarDataProps<D>['data']
    key: string
}

export type RadarSvgProps<D extends Record<string, unknown>> = Partial<RadarCommonProps<D>> &
    RadarDataProps<D> &
    Dimensions &
    MotionProps &
    SvgDefsAndFill<RadarSvgFillMatcherDatum<D>> &
    RadarHandlers<D, SVGPathElement>

export type BoundLegendProps = Required<Pick<LegendProps, 'data'>> & Omit<LegendProps, 'data'>

export type MouseEventHandler<RawDatum, ElementType = HTMLCanvasElement> = (
    datum: RawDatum,
    event: MouseEvent<ElementType>
) => void

export type RadarHandlers<RawDatum, ElementType> = {
    onClick?: MouseEventHandler<RawDatum, ElementType>
}
