import React, { Component } from 'react'
import Aux from '../Auxx/Auxx'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state ={
    showSideDrawer: true
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  } 

  sideDrawerToggleHandle = () => {
    this.setState(prevState => {
      return {showSideDrawer: !prevState.showSideDrawer}
    } )
  }

  render(){
    return (
      <Aux>
        <Toolbar 
          drawerToggleClicked={this.sideDrawerToggleHandle} />
        <SideDrawer 
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerClosedHandler} 
          />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
} 

export default Layout 