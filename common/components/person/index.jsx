import React from 'react'
import Colors from 'material-ui/lib/styles/colors'
import {Grid, Cell} from 'rgx'
import Paper from 'material-ui/lib/paper'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import CircularProgress from 'material-ui/lib/circular-progress'
import {connect} from 'react-redux'

import {fetchCurrentPerson, receiveCurrentPerson, resetCurrentPerson, fetchLikePerson, fetchDislikePerson} from 'actions'

class Person extends React.Component {

  constructor(props) {
    super(props)

    this.handleLikeClick = this.handleLikeClick.bind(this)
    this.handleDislikeClick = this.handleDislikeClick.bind(this)
  }

  componentDidMount() {
    let currentPerson = this.props.people.list.find(person => person.url == decodeURIComponent(this.props.params.id))
    if (currentPerson) {
      this.props.dispatch(receiveCurrentPerson(currentPerson))
    } else {
      this.props.dispatch(fetchCurrentPerson(decodeURIComponent(this.props.params.id)))
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetCurrentPerson())
  }

  render() {
    const styles = {
      container: {
        margin: '0 2%',
        padding: '10px 0'
      },
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
      },
      progress: {
        left: '50%',
        transform: 'translateX(-50%)'
      }
    }

    let likePercentage = (!this.props.people.currentPerson || (this.props.people.currentPerson.like == 0 && this.props.people.currentPerson.dislike == 0)) ? -1 : (this.props.people.currentPerson.like / (this.props.people.currentPerson.like + this.props.people.currentPerson.dislike) * 100)

    return (
      <Grid>
        <Cell min={50} />
        <Cell min={1024}>
          {this.props.people.currentPerson ? (
            <div style={styles.container}>
              <Paper style={styles.paper}>
                <h1 style={styles.text}>{this.props.people.currentPerson.name}</h1>
                <div style={styles.text}>
                  <Grid>
                    <Cell min={200}>Height:</Cell>
                    <Cell min={400}>{this.props.people.currentPerson.height} cm</Cell>
                  </Grid>
                  <Grid>
                    <Cell min={200}>Weight:</Cell>
                    <Cell min={400}>{this.props.people.currentPerson.mass} kg</Cell>
                  </Grid>
                  <Grid>
                    <Cell min={200}>Hair color:</Cell>
                    <Cell min={400}>{this.props.people.currentPerson.hair_color}</Cell>
                  </Grid>
                  <Grid>
                    <Cell min={200}>Skin color:</Cell>
                    <Cell min={400}>{this.props.people.currentPerson.skin_color}</Cell>
                  </Grid>
                  <Grid>
                    <Cell min={200}>Eye color:</Cell>
                    <Cell min={400}>{this.props.people.currentPerson.eye_color}</Cell>
                  </Grid>
                  <Grid>
                    <Cell min={200}>Birth year:</Cell>
                    <Cell min={400}>{this.props.people.currentPerson.birth_year}</Cell>
                  </Grid>
                  <Grid>
                    <Cell min={200}>Gender:</Cell>
                    <Cell min={400}>{this.props.people.currentPerson.gender}</Cell>
                  </Grid>
                </div>
              </Paper>
              <Paper style={styles.paper}>
                <Grid>
                  <Cell min={500}>
                    <h3 style={styles.text}>
                      {likePercentage == -1 ? `Nobody has voted for ${this.props.people.currentPerson.name} yet.` : `${likePercentage.toFixed(2)}% visitors love ${this.props.people.currentPerson.name}.`}
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
            </div>
          ) : ''}
          {this.props.request.isFetching ? <CircularProgress size={0.6} color={Colors.yellow700} style={styles.progress} /> : ''}
        </Cell>
        <Cell min={50} />
      </Grid>
    )
  }

  handleLikeClick() {
    this.props.dispatch(fetchLikePerson(this.props.people.currentPerson.url, this.props.people.currentPerson.like))
  }

  handleDislikeClick() {
    this.props.dispatch(fetchDislikePerson(this.props.people.currentPerson.url, this.props.people.currentPerson.dislike))
  }
}

export default connect(state => ({
  request: state.request,
  people: state.people
}))(Person)
