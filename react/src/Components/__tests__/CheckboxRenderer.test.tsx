import * as React from 'react'
import { shallow } from 'enzyme'
import idObj from 'identity-obj-proxy'

import CheckboxRenderer, { Props } from '../CheckboxRenderer'

const props: Props = {
    field: {
        id: 1,
        type: 'checkbox',
        question: 'which day you like?',
        selections: 'Monday###Tuesday###Friday',
    },
    onDelete: jest.fn(),
	classes: idObj,
}

describe('CheckboxRenderer', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<CheckboxRenderer {...props} />).dive()
		expect(wrapper).toMatchSnapshot()
	})
})
