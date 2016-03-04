import React from 'react'
import Colors from 'material-ui/lib/styles/colors'
import {connect} from 'react-redux'
import CircularProgress from 'material-ui/lib/circular-progress'

import Card from 'components/home/card'

import {fetchPeopleList} from 'actions'

class Home extends React.Component {

  constructor(props) {
    super(props)

    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    document.title = 'Star Wars Portal'

    window.addEventListener('scroll', this.handleScroll)

    this.props.dispatch(fetchPeopleList(null))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const styles = {
      container: {
        padding: '10px 0'
      },
      progress: {
        left: '50%',
        transform: 'translateX(-50%)'
      }
    }

    return (
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
    )
  }

  handleScroll() {
    if (!this.props.request.isFetching && !this.props.people.eol && (window.innerHeight + window.scrollY + 10) >= document.body.offsetHeight) this.props.dispatch(fetchPeopleList(this.props.people.next))
  }
}

export default connect(state => ({
  request: state.request,
  people: state.people
}))(Home)
