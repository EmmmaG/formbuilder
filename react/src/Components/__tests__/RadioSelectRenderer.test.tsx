import * as React from 'react'
import { shallow } from 'enzyme'
import idObj from 'identity-obj-proxy'

import RadioSelectRenderer, { Props } from '../RadioSelectRenderer'

const props: Props = {
    field: {
        id: 1,
        type: 'radioSelect',
        question: 'which day you like best?',
        selections: 'Monday###Tuesday###Friday',
    },
    onDelete: jest.fn(),
	classes: idObj,
}

describe('RadioSelectRenderer', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<RadioSelectRenderer {...props} />).dive()
		expect(wrapper).toMatchSnapshot()
	})
})
