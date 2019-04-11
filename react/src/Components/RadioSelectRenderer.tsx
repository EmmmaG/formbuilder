import * as React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'

import { RadioSelect } from './RadioSelectBuilder'

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
    field: RadioSelect
    onDelete: (id: number) => void
}

export interface State {
    value: string
}

export class RadioSelectRenderer extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props)

        this.state = {
            value: '',
        }
    }

    private onDelete = () => {
        this.props.onDelete(this.props.field.id!)
    }

    private onFieldChange = (e: React.ChangeEvent<any>) => {
        this.setState({ value: e.target.value })
    }

    private renderSelections = () => {
        const { field } = this.props
        const selections = field.selections.split('###')

        return selections.map((s, i) => <FormControlLabel value={i.toString()} control={<Radio />} label={s} />)
    }

	public render() {
        const { classes, field } = this.props
        const { value } = this.state

		return (
            <div className={classes.container}>
                <FormControl>
                    <FormLabel>{field.question}</FormLabel>

                    <RadioGroup
                        name={field.question}
                        value={value}
                        onChange={this.onFieldChange}
                    >
                        {this.renderSelections()}
                    </RadioGroup>

                </FormControl>
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

export default withStyles(styles)(RadioSelectRenderer)
