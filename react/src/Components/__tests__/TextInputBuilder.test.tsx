import * as React from 'react'
import { shallow } from 'enzyme'
import idObj from 'identity-obj-proxy'
import TextField from '@material-ui/core/TextField'

import TextInputBuilder, { Props } from '../TextInputBuilder'

const props: Props = {
    onCreate: jest.fn(),
	classes: idObj,
}

describe('TextInputBuilder', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<TextInputBuilder {...props} />).dive()
		expect(wrapper).toMatchSnapshot()
	})

	it('sets correct value', () => {
		const wrapper = shallow(<TextInputBuilder {...props} />).dive()
		const questionField = wrapper.find(TextField).findWhere(t => t.prop('id') === 'question')

		questionField.prop('onChange')({ target: { value: 'weather?' } })

		expect(wrapper.state('textInputValue')).toEqual(expect.objectContaining({
			question: 'weather?',
		}))
	})
})
