import React, { Component } from 'react';
import { showBackground, hideBackground } from './TopBarActions';
import { toggleCart } from '../cart/CartActions';
import { connect } from 'react-redux';
import TopBar from './TopBar';

class TopBarContainer extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    document.querySelector(".App").addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    document.querySelector(".App").removeEventListener('scroll', this.handleScroll);
  }
  handleScroll(event) {
    const visible = this.props.backgroundVisible;
    if (document.querySelector(".App").scrollTop > 7 && !visible) {
      this.props.showBackground();
    } else if (document.querySelector(".App").scrollTop <= 7 && visible){
      this.props.hideBackground();
    }
  }
  render() {
    return (
      <TopBar
        backgroundVisible={this.props.backgroundVisible}
        cartTotal={this.props.cartTotal}
        onCartClick={this.props.onCartClick}
      />
    );
  }
}

function mapStateToProps(store) {
  return {
    backgroundVisible: store.topBar.backgroundVisible,
    cartTotal: store.cart.cart.length
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showBackground: () => {
      dispatch(showBackground())
    },
    hideBackground: () => {
      dispatch(hideBackground())
    },
    onCartClick: () => {
      dispatch(toggleCart())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBarContainer);