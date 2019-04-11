import * as React from 'react'
import { shallow } from 'enzyme'
import idObj from 'identity-obj-proxy'

import FormBuilder, { Props } from '../FormBuilder'

const props: Props = {
    onFieldsCreate: jest.fn(),
	classes: idObj,
}

describe('FormBuilder', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<FormBuilder {...props} />).dive()
		expect(wrapper).toMatchSnapshot()
	})
})
