import * as React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { TextInput } from '../Components/TextInputBuilder'

const styles = () => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '20px',
    },
    deleteButton: {
        height: '40px',
    }
})

export interface Props extends WithStyles<typeof styles> {
    field: TextInput
    onDelete: (id: number) => void
}

export interface State {
    value: string
}

export class TextInputRenderer extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props)

        this.state = {
            value: this.props.field.defaultValue || '',
        }
    }

    private onDelete = () => {
        this.props.onDelete(this.props.field.id!)
    }

    private onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        this.setState({ value: e.target.value })
    }

	public render() {
        const { classes, field } = this.props
        const { value } = this.state

		return (
            <div className={classes.container}>
                <div>
                    <Typography>{field.question}</Typography>
                    <TextField
                        key={field.id}
                        label={field.label}
                        placeholder={field.placeholder}
                        value={value}
                        onChange={(e) => this.onTextFieldChange(e)}
                        margin='normal'
                    />
                </div>
                <Button
                    variant='outlined'
                    color='secondary'
                    onClick={this.onDelete}
                    className={classes.deleteButton}
                >
                    Delete
                </Button>
            </div>
		)
	}
}

export default withStyles(styles)(TextInputRenderer)
