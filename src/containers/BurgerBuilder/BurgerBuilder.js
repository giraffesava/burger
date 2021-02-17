import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from '../../axios-orders'

import Aux from '../../hoc/Auxx/Auxx'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
//import * as actionTypes from '../../store/actions/actionTypes'
import * as burgerBuilderActions from '../../store/actions/index'


class BurgerBuilder extends Component {
  state ={
    purchasing: false
  }

  componentDidMount(){
    this.props.onInitIngredients()
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
      this.props.history.push('/checkout')
  }

  render(){
    const disabledInfo = {
      ...this.props.ings
    }
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null
    let burger = this.props.error ? <p>ingredints can't be loaded</p> : <Spinner />
    if(this.props.ings){
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls 
            ingredientAdded={this.props.onIngredientAdded} 
            ingredientRemoved={this.props.onIngredientRemoved} 
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}/>
        </Aux>
      )
      orderSummary = <OrderSummary 
      ingredients={this.props.ings}
      purchaseCanceled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      price={this.props.price}
  />
    }
    
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
          {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))