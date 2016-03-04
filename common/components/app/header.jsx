import React from 'react'
import {Link} from 'react-router'
import Colors from 'material-ui/lib/styles/colors'
import AppBar from 'material-ui/lib/app-bar'

export default class Header extends React.Component {

  render() {
    const styles = {
      appBar: {
        height: '48px',
        minHeight: '48px',
        lineHeight: '48px',
        paddingLeft: '16px',
        paddingRight: '16px',
        backgroundColor: Colors.grey900
      },
      appBarTitle: {
        lineHeight: '48px',
        textAlign: 'center'
      },
      titleLink: {
        fontSize: '30px',
        lineHeight: '48px',
        color: Colors.yellow800,
        textDecoration: 'none'
      },
      alphaSpan: {
        fontSize: '14px',
        color: Colors.grey500
      }
    }

    return (
      <header>
        <nav>
          <AppBar title={<Link to="/" style={styles.titleLink}>Star Wars</Link>} showMenuIconButton={false} style={styles.appBar} titleStyle={styles.appBarTitle} />
        </nav>
      </header>
    )
  }
}
