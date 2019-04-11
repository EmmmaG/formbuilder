import * as React from 'react'
import { shallow } from 'enzyme'
import idObj from 'identity-obj-proxy'

import TextInputRenderer, { Props } from '../TextInputRenderer'

const props: Props = {
    field: {
        id: 1,
        type: 'textInput',
        question: 'which day you like best?',
        placeholder: 'day',
    },
    onDelete: jest.fn(),
	classes: idObj,
}

describe('TextInputRenderer', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<TextInputRenderer {...props} />).dive()
		expect(wrapper).toMatchSnapshot()
	})
})
