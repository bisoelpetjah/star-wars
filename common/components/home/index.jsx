import React from 'react'
import Colors from 'material-ui/lib/styles/colors'
import {Grid, Cell} from 'rgx'
import CircularProgress from 'material-ui/lib/circular-progress'
import {connect} from 'react-redux'

import Card from 'components/home/card'

import {fetchPeopleList} from 'actions'

class Home extends React.Component {

  static getInitialData(dispatch, params) {
    return dispatch(fetchPeopleList(null))
  }

  constructor(props) {
    super(props)

    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    document.title = 'Star Wars Portal'

    window.addEventListener('scroll', this.handleScroll)

    if (!this.props.request.isFetching && !this.props.people.eol && this.props.people.list.length == 0) this.constructor.getInitialData(this.props.dispatch)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
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
        <Cell max={1024}>
          <div style={styles.container}>
            {
              this.props.people.list.map(person => {
                return (
                  <Card key={person.url} person={person} />
                )
              })
            }
            {this.props.request.isFetching ? <CircularProgress size={0.6} color={Colors.yellow700} style={styles.progress} /> : ''}
          </div>
        </Cell>
        <Cell min={50} />
      </Grid>
    )
  }

  handleScroll() {
    if (!this.props.request.isFetching && !this.props.people.eol && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) this.props.dispatch(fetchPeopleList(this.props.people.next))
  }
}

export default connect(state => ({
  request: state.request,
  people: state.people
}))(Home)
