import * as React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Field } from './FormBuilder'
import { TextInput } from '../Components/TextInputBuilder'
import { RadioSelect } from '../Components/RadioSelectBuilder'
import { Checkbox } from '../Components/CheckboxBuilder'

import TextInputRenderer from '../Components/TextInputRenderer'
import RadioSelectRenderer from '../Components/RadioSelectRenderer'
import CheckboxRenderer from '../Components/CheckboxRenderer'

const styles = () => ({
    container: {
        minWidth: '400px',
        height: '100vh',
        overflowY: 'auto' as 'auto',
    },
    title: {
        fontSize: '25px',
        margin: '10px',
    },
})

export interface Props extends WithStyles<typeof styles> {
    fields: Field[]
    onDelete: (id: number) => void
}

export class FormRenderer extends React.Component<Props> {
    private onDelete = (id: number) => {
        this.props.onDelete(id)
    }

    private renderTextInput = (field: TextInput) => <TextInputRenderer key={field.id} field={field} onDelete={this.onDelete} />
    private renderRadioSelect = (field: RadioSelect) => <RadioSelectRenderer key={field.id} field={field} onDelete={this.onDelete} />
    private renderCheckbox = (field: Checkbox) => <CheckboxRenderer key={field.id} field={field} onDelete={this.onDelete} />

    private renderForms = () => {
        const { fields } = this.props

        return fields.map(field => {
            if (field.type === 'textInput') {
                return this.renderTextInput(field)
            }
            if (field.type === 'radioSelect') {
                return this.renderRadioSelect(field)
            }
            if (field.type === 'checkbox') {
                return this.renderCheckbox(field)
            }
        })
    }

	public render() {
        const { classes } = this.props

		return (
			<Paper className={classes.container}>
                <Typography className={classes.title}>Form Preview</Typography>

                {this.renderForms()}
            </Paper>
		)
	}
}

export default withStyles(styles)(FormRenderer)
