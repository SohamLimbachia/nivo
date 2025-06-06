import { ResponsiveWaffleCanvas } from '@nivo/waffle'
import { testChartResponsiveness } from '../../helpers/responsive'

describe('WaffleCanvas', () => {
    testChartResponsiveness(defaults => (
        <ResponsiveWaffleCanvas
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            total={100}
            data={[
                {
                    id: 'cats',
                    label: 'Cats',
                    value: 43,
                },
                {
                    id: 'dogs',
                    label: 'Dogs',
                    value: 27,
                },
                {
                    id: 'rabbits',
                    label: 'Rabits',
                    value: 17,
                },
            ]}
            columns={12}
            rows={20}
            animate={false}
            role="chart"
            pixelRatio={1}
        />
    ))
})
