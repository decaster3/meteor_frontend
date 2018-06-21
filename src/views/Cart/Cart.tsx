import * as React from "react"
import {compose} from "redux"
import withCart, {CartProps} from "../../containers/Cart"
import {CartProduct} from "../../containers/Cart/actions"
import CartProductView from "./CartProduct"
import Checkout from "../Checkout"

interface CartState {
  choosenMeteors: number
}
class Cart extends React.Component<CartProps, CartState> {
  state: CartState = {
    choosenMeteors: 0,
  }

  handleChangeMeteors = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({choosenMeteors: parseInt(event.currentTarget.value, 10)})
  }

  render() {
    return (
      <div>
        <div>
          {this.props.products.map(product => (
            <CartProductView
              key={product.instance.id}
              product={product}
              addProductToCart={this.props.addProductToCart}
              removeProductFromCart={this.props.removeProductFromCart}
            />
          ))}
        </div>
        <div>{this.props.total - this.state.choosenMeteors}</div>
        <div>
          <p>Метеоры: </p>
          <p>
            {this.props.possibleMeteors - this.state.choosenMeteors}
            <span>
              <input
                type="range"
                min="0"
                max={
                  this.props.possibleMeteors < this.props.total
                    ? this.props.possibleMeteors
                    : this.props.total
                }
                value={this.state.choosenMeteors}
                onInput={this.handleChangeMeteors}
                onChange={this.handleChangeMeteors}
                step="10"
              />
            </span>
            {this.props.total - this.state.choosenMeteors}
          </p>
        </div>
        <Checkout />
      </div>
    )
  }
}

export default compose(withCart)(Cart)
