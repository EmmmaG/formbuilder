import * as React from 'react'
import { shallow } from 'enzyme'
import idObj from 'identity-obj-proxy'
import TextField from '@material-ui/core/TextField'

import CheckboxBuilder, { Props } from '../CheckboxBuilder'

const props: Props = {
    onCreate: jest.fn(),
	classes: idObj,
}

describe('CheckboxBuilder', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<CheckboxBuilder {...props} />).dive()
		expect(wrapper).toMatchSnapshot()
	})

	it('sets correct value', () => {
		const wrapper = shallow(<CheckboxBuilder {...props} />).dive()
		const questionField = wrapper.find(TextField).findWhere(t => t.prop('id') === 'question')

		questionField.prop('onChange')({ target: { value: 'weather?' } })

		expect(wrapper.state('checkboxValue')).toEqual(expect.objectContaining({
			question: 'weather?',
		}))
	})
})
