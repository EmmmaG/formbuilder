import * as React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = () => ({
    title: {
        fontSize: '25px',
        margin: '10px',
    },
    fieldContainer: {
        margin: '25px',
    }
})

export interface Checkbox {
    id?: number
    type: 'checkbox'
    question: string
    selections: string
}

type TextInputKey = keyof Checkbox

export interface Props extends WithStyles<typeof styles> {
    onCreate: (checkboxValue: Checkbox) => void
}

export interface State {
    checkboxValue: Checkbox
}

const emptyRadioSelect = {
    type: 'checkbox' as 'checkbox',
    question: '',
    selections: '',
}

export class CheckboxBuilder extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props)

        this.state = {
            checkboxValue: emptyRadioSelect
        }
    }

    private onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, textInputKey: TextInputKey) => {
        const currentValue = this.state.checkboxValue
        const newValue = e.target.value

        this.setState({
            checkboxValue: {
                ...currentValue,
                [textInputKey]: newValue,
            }
        })
    }

    private onCreate = () => {
        const { checkboxValue } = this.state

        this.props.onCreate(checkboxValue)

        this.setState({checkboxValue: emptyRadioSelect})
    }

	public render() {
        const { classes } = this.props
        const { checkboxValue } = this.state

		return (
			<div>
                <Typography className={classes.title}>Create a checkbox</Typography>

                <div className={classes.fieldContainer}>
                    <Typography>* Please add a question for your checkbox (Must Have)</Typography>
                    <TextField
                        id='question'
                        label='Checkbox question'
                        value={checkboxValue.question}
                        onChange={(e) => this.onTextFieldChange(e, 'question')}
                        margin='normal'
                    />
                </div>

                <div className={classes.fieldContainer}>
                    <Typography>Please add selections for your checkbox (Must Have)</Typography>
                    <Typography>Please use ### to seperate different selections</Typography>

                    <TextField
                        id='selections'
                        label='Checkbox selections'
                        value={checkboxValue.selections}
                        onChange={(e) => this.onTextFieldChange(e, 'selections')}
                        margin='normal'
                    />
                </div>

                <Button
                    variant='outlined'
                    color='primary'
                    className={classes.fieldContainer}
                    onClick={this.onCreate}
                    disabled={!checkboxValue.question || !checkboxValue.selections}
                >
                    Create Radio Select
                </Button>
            </div>
		)
	}
}

export default withStyles(styles)(CheckboxBuilder)
