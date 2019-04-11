import * as React from 'react'
import { shallow } from 'enzyme'
import idObj from 'identity-obj-proxy'

import FormRenderer, { Props } from '../FormRenderer'

const fields = [{
    id: 1,
    type: 'textInput',
    question: 'which day you like best?',
    placeholder: 'day',
}, {
    id: 2,
    type: 'checkbox',
    question: 'which day you like?',
    selections: 'Monday###Tuesday###Friday',
}] as any

const props: Props = {
    fields,
    onDelete: jest.fn(),
	classes: idObj,
}

describe('FormRenderer', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<FormRenderer {...props} />).dive()
		expect(wrapper).toMatchSnapshot()
	})
})
