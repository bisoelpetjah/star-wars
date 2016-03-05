import React from 'react'
import Colors from 'material-ui/lib/styles/colors'
import Paper from 'material-ui/lib/paper'
import {Link} from 'react-router'

export default class Card extends React.Component {

  render() {
    const styles = {
      link: {
        textDecoration: 'none'
      },
      paper: {
        margin: '5px 0',
        padding: '10px 3%',
        backgroundColor: Colors.grey800
      },
      text: {
        color: Colors.yellow700
      }
    }

    return (
      <Link to={`/person/${encodeURIComponent(this.props.person.url)}`} style={styles.link}>
        <Paper style={styles.paper}>
          <h2 style={styles.text}>{this.props.person.name}</h2>
        </Paper>
      </Link>
    )
  }
}
