import React from 'react'
import Colors from 'material-ui/lib/styles/colors'
import {connect} from 'react-redux'

import Header from 'components/app/header'
import Footer from 'components/app/footer'

import {setAccessToken, resetFetchStatus} from 'actions'

class App extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname != nextProps.location.pathname) {
      this.props.dispatch(resetFetchStatus())
    }
  }

  render() {
    const styles = {
      container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Colors.grey500
      },
      progress: {
        height: '2px',
        backgroundColor: Colors.grey200
      },
      main: {flex: '1 0 auto'}
    }

    return (
      <div style={styles.container}>
        <Header />
        <main style={styles.main}>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }
}

export default connect(state => ({request: state.request}))(App)
