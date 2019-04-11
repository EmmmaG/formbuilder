import React from 'react'
import Main from './FormBuilder/Main'

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div style={{ maxWidth: '1280px', margin: 'auto' }}>
        <Main />
      </div>
    )
  }
}
