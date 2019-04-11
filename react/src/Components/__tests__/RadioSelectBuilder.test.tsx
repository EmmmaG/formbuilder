import * as React from 'react'
import { shallow } from 'enzyme'
import idObj from 'identity-obj-proxy'
import TextField from '@material-ui/core/TextField'

import RadioSelectBuilder, { Props } from '../RadioSelectBuilder'

const props: Props = {
    onCreate: jest.fn(),
	classes: idObj,
}

describe('RadioSelectBuilder', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<RadioSelectBuilder {...props} />).dive()
		expect(wrapper).toMatchSnapshot()
	})

	it('sets correct value', () => {
		const wrapper = shallow(<RadioSelectBuilder {...props} />).dive()
		const questionField = wrapper.find(TextField).findWhere(t => t.prop('id') === 'question')

		questionField.prop('onChange')({ target: { value: 'weather?' } })

		expect(wrapper.state('radioSelectValue')).toEqual(expect.objectContaining({
			question: 'weather?',
		}))
	})
})
