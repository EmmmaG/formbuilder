import * as React from 'react'
import { shallow } from 'enzyme'
import idObj from 'identity-obj-proxy'

import Main, { Props } from '../Main'

const props: Props = {
	classes: idObj,
}

describe('Main', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<Main {...props} />).dive()
		expect(wrapper).toMatchSnapshot()
	})
})
