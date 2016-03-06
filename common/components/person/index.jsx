import React from 'react'
import Colors from 'material-ui/lib/styles/colors'
import {Grid, Cell} from 'rgx'
import CircularProgress from 'material-ui/lib/circular-progress'
import {connect} from 'react-redux'

import Detail from 'components/person/detail'
import Vote from 'components/person/vote'

import {fetchCurrentPerson, receiveCurrentPerson, resetCurrentPerson} from 'actions'

class Person extends React.Component {

  componentDidMount() {
    let currentPerson = this.props.people.list.find(person => person.url == decodeURIComponent(this.props.params.id))
    if (currentPerson) {
      this.props.dispatch(receiveCurrentPerson(currentPerson))
    } else {
      this.props.dispatch(fetchCurrentPerson(decodeURIComponent(this.props.params.id)))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.people.currentPerson && nextProps.people.currentPerson) document.title = `${nextProps.people.currentPerson.name} | Star Wars Portal`
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
      progress: {
        left: '50%',
        transform: 'translateX(-50%)'
      }
    }

    return (
      <Grid>
        <Cell min={50} />
        <Cell min={1024}>
          {this.props.people.currentPerson ? (
            <div style={styles.container}>
              <Detail person={this.props.people.currentPerson} />
              <Vote person={this.props.people.currentPerson} dispatch={this.props.dispatch} />
            </div>
          ) : ''}
          {this.props.request.isFetching ? <CircularProgress size={0.6} color={Colors.yellow700} style={styles.progress} /> : ''}
        </Cell>
        <Cell min={50} />
      </Grid>
    )
  }
}

export default connect(state => ({
  request: state.request,
  people: state.people
}))(Person)
