import * as React from 'react'
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

import { Field } from './FormBuilder'
import { TextInput } from '../Components/TextInputBuilder'
import { RadioSelect } from '../Components/RadioSelectBuilder'
import { Checkbox } from '../Components/CheckboxBuilder'

import TextInputRenderer from '../Components/TextInputRenderer'
import RadioSelectRenderer from '../Components/RadioSelectRenderer'
import CheckboxRenderer from '../Components/CheckboxRenderer'

const styles = (theme: Theme) => ({
    container: {
        minWidth: '400px',
        height: '100vh',
        overflowY: 'auto' as 'auto',
    },
    title: {
        fontSize: '25px',
        margin: '10px',
    },
    loaderContainer: {
		textAlign: 'center' as 'center',
	},
	loader: {
		color: theme.palette.grey[600],
		marginTop: '50px',
	},
})

export interface Props extends WithStyles<typeof styles> {
    fields: Field[]
    onDelete: (id: number) => void
    isLoading?: boolean
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
        const { classes, isLoading } = this.props

		return (
			<Paper className={classes.container}>
                <Typography className={classes.title}>Form Preview</Typography>

                <div>
                    {
                        isLoading && (
                            <div className={classes.loaderContainer}>
                                <CircularProgress
                                    className={classes.loader}
                                    size={100}
                                    variant='indeterminate' />
                            </div>
                        )
                    }
                    {
                        !isLoading && this.renderForms()
                    }
                </div>

            </Paper>
		)
	}
}

export default withStyles(styles)(FormRenderer)
