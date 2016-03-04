import React from 'react'
import Colors from 'material-ui/lib/styles/colors'

export default class NotFound extends React.Component {
  render() {
    const styles = {
      message: {
        fontFamily: 'Roboto-Light',
        fontSize: '24px',
        textAlign: 'center',
        padding: '10%',
        color: Colors.grey600
      }
    }

    return (
      <div style={styles.message}>
        <h2>Oops! Nothing here.</h2>
        Page not found.
      </div>
    )
  }
}
