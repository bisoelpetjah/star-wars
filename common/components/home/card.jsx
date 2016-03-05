import React from 'react'
import Colors from 'material-ui/lib/styles/colors'
import {Grid, Cell} from 'rgx'
import Paper from 'material-ui/lib/paper'
import FontIcon from 'material-ui/lib/font-icon'
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
      },
      likeContainer: {
        marginTop: '12px',
        textAlign: 'right',
        color: Colors.yellow700
      }
    }

    let likePercentage = (!this.props.person || (this.props.person.like == 0 && this.props.person.dislike == 0)) ? -1 : (this.props.person.like / (this.props.person.like + this.props.person.dislike) * 100)

    return (
      <Link to={`/person/${encodeURIComponent(this.props.person.url)}`} style={styles.link}>
        <Paper style={styles.paper}>
          <Grid>
            <Cell min={500}>
              <h2 style={styles.text}>{this.props.person.name}</h2>
            </Cell>
            <Cell min={80}>
              <div style={styles.likeContainer}>
                <FontIcon className="material-icons" color={likePercentage == -1 ? Colors.grey900 : Colors.yellow800}>thumb_up</FontIcon>
                <br />
                {likePercentage == -1 ? '' : `${likePercentage.toFixed(2)}%`}
              </div>
            </Cell>
          </Grid>
        </Paper>
      </Link>
    )
  }
}
