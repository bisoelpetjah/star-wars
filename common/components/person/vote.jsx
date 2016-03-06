import React from 'react'
import Colors from 'material-ui/lib/styles/colors'
import {Grid, Cell} from 'rgx'
import Paper from 'material-ui/lib/paper'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'

import {fetchLikePerson, fetchDislikePerson} from 'actions'

export default class Vote extends React.Component {

  constructor(props) {
    super(props)

    this.handleLikeClick = this.handleLikeClick.bind(this)
    this.handleDislikeClick = this.handleDislikeClick.bind(this)
  }

  render() {
    const styles = {
      paper: {
        margin: '5px 0',
        padding: '10px 3%',
        backgroundColor: Colors.grey800
      },
      text: {
        color: Colors.yellow800
      },
      buttonContainer: {
        textAlign: 'right'
      }
    }

    let likePercentage = (!this.props.person || (this.props.person.like == 0 && this.props.person.dislike == 0)) ? -1 : (this.props.person.like / (this.props.person.like + this.props.person.dislike) * 100)

    return(
      <Paper style={styles.paper}>
        <Grid>
          <Cell min={500}>
            <h3 style={styles.text}>
              {likePercentage == -1 ? `Nobody has voted for ${this.props.person.name} yet.` : `${likePercentage.toFixed(2)}% visitors love ${this.props.person.name}.`}
            </h3>
          </Cell>
          <Cell min={100}>
            <div style={styles.buttonContainer}>
              <IconButton onClick={this.handleLikeClick}>
                <FontIcon className="material-icons" color={Colors.yellow800}>thumb_up</FontIcon>
              </IconButton>
              <IconButton onClick={this.handleDislikeClick}>
                <FontIcon className="material-icons" color={Colors.yellow800}>thumb_down</FontIcon>
              </IconButton>
            </div>
          </Cell>
        </Grid>
      </Paper>
    )
  }

  handleLikeClick() {
    this.props.dispatch(fetchLikePerson(this.props.person.url, this.props.person.like))
  }

  handleDislikeClick() {
    this.props.dispatch(fetchDislikePerson(this.props.person.url, this.props.person.dislike))
  }
}
