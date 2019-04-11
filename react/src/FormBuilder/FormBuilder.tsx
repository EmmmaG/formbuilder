import * as React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

import TextInputBuilder, { TextInput } from '../Components/TextInputBuilder'
import RadioSelectBuilder, { RadioSelect } from '../Components/RadioSelectBuilder'
import CheckboxBuilder, { Checkbox } from '../Components/CheckboxBuilder'

const styles = () => ({
	select: {
		height: '35px',
		backgroundColor: 'white',
	},
	selectRoot: {
		display: 'flex',
		alignItems: 'center',
	},
})

export type Field = TextInput | RadioSelect | Checkbox
export type FieldType = 'textInput' | 'radioSelect' | 'checkbox'

export interface Props extends WithStyles<typeof styles> {
	onFieldsCreate: (field: Field) => void
	fetchData: () => Promise<void>
}

export interface State {
	fieldType: FieldType
}

export class FormBuilder extends React.Component<Props, State> {
	public constructor(props: Props) {
        super(props)

        this.state = {
            fieldType: 'textInput',
        }
	}

	private handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		this.setState({ fieldType: event.target.value as FieldType })
	}

	private renderOptions = () => [{
		value: 'textInput',
		label: 'Text Input',
	}, {
		value: 'radioSelect',
		label: 'Radio Select',
	}, {
		value: 'checkbox',
		label: 'Checkbox',
	}].map(o => (
		<option value={o.value} key={o.value}>
			{o.label}
		</option>
	))

	private renderFieldBuilder = () => {
		const { fieldType } = this.state
        const { onFieldsCreate } = this.props

		if (fieldType === 'textInput') {
			return <TextInputBuilder onCreate={onFieldsCreate} />
		}

		if (fieldType === 'radioSelect') {
			return <RadioSelectBuilder onCreate={onFieldsCreate} />
		}

		if (fieldType === 'checkbox') {
			return <CheckboxBuilder onCreate={onFieldsCreate} />
		}
	}

	public render() {
        const { classes } = this.props

		return (
			<div>
				<Typography>Please select a field type to create</Typography>
				<FormControl variant='outlined'>
					<Select
						style={{ width: '250px' }}
						className={classes.select}
						classes={{ root: classes.selectRoot }}
						native
						value={this.state.fieldType}
						onChange={this.handleChange}
						input={
							<OutlinedInput
								name={'field type'}
								labelWidth={0}
								id={'type'}
							/>
						}
					>
						{this.renderOptions()}
					</Select>
				</FormControl>

				<Typography>Or load a existing form from server</Typography>
				<Button
					variant='outlined'
					color='primary'
					onClick={this.props.fetchData}
				>
					Load saved form
				</Button>

				<div>
					{this.renderFieldBuilder()}
				</div>
            </div>
		)
	}
}

export default withStyles(styles)(FormBuilder)
