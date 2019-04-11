import * as React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles'

import FormBuilder, { Field } from './FormBuilder'
import FormRenderer from './FormRenderer'

const styles = () => ({
    container: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap' as 'wrap',
    },
})

export interface Props extends WithStyles<typeof styles> {
}

export interface State {
    fields: Field[]
	isLoading: boolean
}

export class Main extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props)

        this.state = {
            fields: [],
			isLoading: false,
        }
    }

    private onFieldsCreate = (field: Field) => {
        const currentFields = this.state.fields
        const newField = {
            ...field,
            id: currentFields.length
                ? currentFields[currentFields.length - 1].id! + 1
                : 1
        }
        currentFields.push(newField)

        this.setState({ fields: currentFields })
    }

    private onFieldDelete = (id: number) => {
        const currentFields = this.state.fields
        const newFields = currentFields.filter(f => f.id !== id)

        this.setState({ fields: newFields })
    }

    private fetchData = async() => {
		this.setState({ isLoading: true})

		await fetch('http://localhost:8001/fields')
			.then(response => {
				return response.json()
			}).then(data => {
				this.setState({ fields: data })
			})

		this.setState({ isLoading: false })
	}


    public render() {
        const { classes } = this.props
        const { fields, isLoading } = this.state

        return (
            <div className={classes.container}>
                <FormBuilder onFieldsCreate={this.onFieldsCreate} fetchData={this.fetchData}/>
                <FormRenderer onDelete={this.onFieldDelete} fields={fields} />
            </div>
        )
    }
}

export default withStyles(styles)(Main)
