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

export interface TextInput {
    id?: number
    type: 'textInput'
    question: string
    placeholder?: string
    defaultValue?: string
    label?: string
}

type TextInputKey = keyof TextInput

export interface Props extends WithStyles<typeof styles> {
    onCreate: (textInputValue: TextInput) => void
}

export interface State {
    textInputValue: TextInput
}

const emptyTextInput = {
    type: 'textInput' as 'textInput',
    question: '',
    placeholder: '',
    defaultValue: '',
    label: '',
}

export class TextInputBuilder extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props)

        this.state = {
            textInputValue: emptyTextInput
        }
    }

    private onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, textInputKey: TextInputKey) => {
        const currentTextInputValue = this.state.textInputValue
        const newValue = e.target.value

        this.setState({
            textInputValue: {
                ...currentTextInputValue,
                [textInputKey]: newValue,
            }
        })
    }

    private onCreate = () => {
        const { textInputValue } = this.state

        this.props.onCreate(textInputValue)

        this.setState({textInputValue: emptyTextInput})
    }

	public render() {
        const { classes } = this.props
        const { textInputValue } = this.state

		return (
			<div>
                <Typography className={classes.title}>Create a text input</Typography>

                <div className={classes.fieldContainer}>
                    <Typography>* Please add a question for your text input (Must Have)</Typography>
                    <TextField
                        id='question'
                        label="Text input question"
                        value={textInputValue.question}
                        onChange={(e) => this.onTextFieldChange(e, 'question')}
                        margin='normal'
                    />
                </div>

                <div className={classes.fieldContainer}>
                    <Typography>Please add a placeholder for your text input (Optional)</Typography>
                    <TextField
                        id='placeholder'
                        label="Text input placeholder"
                        value={textInputValue.placeholder}
                        onChange={(e) => this.onTextFieldChange(e, 'placeholder')}
                        margin='normal'
                    />
                </div>

                <div className={classes.fieldContainer}>
                    <Typography>Please add a display label for your text input (Optional) </Typography>
                    <TextField
                        id='label'
                        label="Text input label"
                        value={textInputValue.label}
                        onChange={(e) => this.onTextFieldChange(e, 'label')}
                        margin='normal'
                    />
                </div>

                <div className={classes.fieldContainer}>
                    <Typography>Please add a default text for your text input (Optional)</Typography>
                    <TextField
                        id='defaultValue'
                        label="Text input defaultValue"
                        value={textInputValue.defaultValue}
                        onChange={(e) => this.onTextFieldChange(e, 'defaultValue')}
                        margin='normal'
                    />
                </div>

                <Button
                    variant='outlined'
                    color='primary'
                    className={classes.fieldContainer}
                    onClick={this.onCreate}
                    disabled={!textInputValue.question}
                >
                    Create Text Input
                </Button>
            </div>
		)
	}
}

export default withStyles(styles)(TextInputBuilder)
