import React from 'react'
import Colors from 'material-ui/lib/styles/colors'
import {Grid, Cell} from 'rgx'
import Paper from 'material-ui/lib/paper'

export default class Card extends React.Component {

  render() {
    const styles = {
      paper: {
        margin: '5px 2%',
        padding: '10px 3%',
        backgroundColor: Colors.grey800
      },
      text: {
        color: Colors.yellow700
      }
    }

    return (
      <Grid>
        <Cell min={50} />
        <Cell min={800}>
          <Paper style={styles.paper}>
            <h2 style={styles.text}>{this.props.person.name}</h2>
          </Paper>
        </Cell>
        <Cell min={50} />
      </Grid>
    )
  }
}
