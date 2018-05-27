import * as React from "react"
import {compose} from "redux"
import withCart from "../../containers/Cart"
import {CartProduct} from "../../containers/Cart/actions"
import CartProductView from "../CartProduct"

interface CartProps {
  meteors: number
  possibleMeteors: number
  total: number
  products: CartProduct[]
  removeProductFromCart(product: CartProduct): void
  addProductToCart(product: CartProduct): void
  updateTotalCart(): void
}
interface CartState {
  choosenMeteors: number
}
class Cart extends React.Component<CartProps, CartState> {
  constructor(props: CartProps) {
    super(props)
    this.state = {
      choosenMeteors: 0,
    }
  }
  renderProducts = () => {
    return this.props.products.map((product: CartProduct) => (
      <CartProductView
        key={product.instance.id}
        product={product}
        addProductToCart={this.props.addProductToCart}
        removeProductFromCart={this.props.removeProductFromCart}
      />
    ))
  }
  handleChangeMeteors = (event: any) => {
    this.setState({choosenMeteors: event.target.value})
  }
  render() {
    return (
      <div>
        <div>{this.props.total - this.state.choosenMeteors}</div>
        <div>{this.renderProducts()}</div>
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
      </div>
    )
  }
}

export default compose(withCart)(Cart)
