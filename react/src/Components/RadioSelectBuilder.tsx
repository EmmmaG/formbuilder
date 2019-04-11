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

export interface RadioSelect {
    id?: number
    type: 'radioSelect'
    question: string
    selections: string
}

type TextInputKey = keyof RadioSelect

export interface Props extends WithStyles<typeof styles> {
    onCreate: (radioSelectValue: RadioSelect) => void
}

export interface State {
    radioSelectValue: RadioSelect
}

const emptyRadioSelect = {
    type: 'radioSelect' as 'radioSelect',
    question: '',
    selections: '',
}

export class RadioSelectBuilder extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props)

        this.state = {
            radioSelectValue: emptyRadioSelect
        }
    }

    private onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, textInputKey: TextInputKey) => {
        const currentRadioSelectValue = this.state.radioSelectValue
        const newValue = e.target.value

        this.setState({
            radioSelectValue: {
                ...currentRadioSelectValue,
                [textInputKey]: newValue,
            }
        })
    }

    private onCreate = () => {
        const { radioSelectValue } = this.state

        this.props.onCreate(radioSelectValue)

        this.setState({radioSelectValue: emptyRadioSelect})
    }

	public render() {
        const { classes } = this.props
        const { radioSelectValue } = this.state

		return (
			<div>
                <Typography className={classes.title}>Create a radio select</Typography>

                <div className={classes.fieldContainer}>
                    <Typography>* Please add a question for your radio select (Must Have)</Typography>
                    <TextField
                        id='question'
                        label='Radio select question'
                        value={radioSelectValue.question}
                        onChange={(e) => this.onTextFieldChange(e, 'question')}
                        margin='normal'
                    />
                </div>

                <div className={classes.fieldContainer}>
                    <Typography>Please add selections for your radio select (Must Have)</Typography>
                    <Typography>Please use ### to seperate different selections</Typography>

                    <TextField
                        id='selections'
                        label='Radio select selections'
                        value={radioSelectValue.selections}
                        onChange={(e) => this.onTextFieldChange(e, 'selections')}
                        margin='normal'
                    />
                </div>

                <Button
                    variant='outlined'
                    color='primary'
                    className={classes.fieldContainer}
                    onClick={this.onCreate}
                    disabled={!radioSelectValue.question || !radioSelectValue.selections}
                >
                    Create Radio Select
                </Button>
            </div>
		)
	}
}

export default withStyles(styles)(RadioSelectBuilder)
