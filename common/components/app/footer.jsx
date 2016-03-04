import React from 'react'
import Colors from 'material-ui/lib/styles/colors'

export default class Login extends React.Component {
  render() {
    const styles = {
      footer: {
        height: '50px',
        fontSize: '14px',
        lineHeight: '14px',
        color: Colors.grey500,
        backgroundColor: Colors.grey50
      },
      footerContainer: {
        width: '85%',
        margin: 'auto',
        lineHeight: '50px'
      }
    }

    return (
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          &copy; Sokcoba.in 2016
        </div>
      </footer>
    )
  }
}
