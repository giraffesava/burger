import React, { Component } from 'react'
import './App.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
class App extends Component {

  render(){
    return (
      <Layout>
        {this.state.show ? <BurgerBuilder /> : null}
      </Layout>
    );
  }
}


export default App;
