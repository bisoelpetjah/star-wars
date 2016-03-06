import React from 'react'
import Colors from 'material-ui/lib/styles/colors'
import {Grid, Cell} from 'rgx'
import Paper from 'material-ui/lib/paper'

export default class Detail extends React.Component {

  render() {
    const styles = {
      paper: {
        margin: '5px 0',
        padding: '10px 3%',
        backgroundColor: Colors.grey800
      },
      text: {
        color: Colors.yellow800
      }
    }

    return (
      <Paper style={styles.paper}>
        <h1 style={styles.text}>{this.props.person.name}</h1>
        <div style={styles.text}>
          <Grid>
            <Cell min={200}>Height:</Cell>
            <Cell min={400}>{this.props.person.height} cm</Cell>
          </Grid>
          <Grid>
            <Cell min={200}>Weight:</Cell>
            <Cell min={400}>{this.props.person.mass} kg</Cell>
          </Grid>
          <Grid>
            <Cell min={200}>Hair color:</Cell>
            <Cell min={400}>{this.props.person.hair_color}</Cell>
          </Grid>
          <Grid>
            <Cell min={200}>Skin color:</Cell>
            <Cell min={400}>{this.props.person.skin_color}</Cell>
          </Grid>
          <Grid>
            <Cell min={200}>Eye color:</Cell>
            <Cell min={400}>{this.props.person.eye_color}</Cell>
          </Grid>
          <Grid>
            <Cell min={200}>Birth year:</Cell>
            <Cell min={400}>{this.props.person.birth_year}</Cell>
          </Grid>
          <Grid>
            <Cell min={200}>Gender:</Cell>
            <Cell min={400}>{this.props.person.gender}</Cell>
          </Grid>
        </div>
      </Paper>
    )
  }
}
