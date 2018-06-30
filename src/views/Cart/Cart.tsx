import * as React from "react"
import {compose} from "redux"
import withCart, {CartProps} from "../../containers/Cart"
import {CartProduct} from "../../containers/Cart/actions"
import CartProductView from "./CartProduct"
import Checkout from "../Checkout"
import Row from "reactstrap/lib/Row"
import Col from "reactstrap/lib/Col"
import {cx, css} from "emotion"
import {withTheme} from "emotion-theming"
import {ThemeProps} from "../App/Theme"

interface CartState {
  choosenMeteors: number
}
class Cart extends React.Component<CartProps & ThemeProps, CartState> {
  state: CartState = {
    choosenMeteors: 0,
  }

  handleChangeMeteors = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({choosenMeteors: parseInt(event.currentTarget.value, 10)})
  }

  render() {
    return (
      <div>
        <h2>Корзина</h2>

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

        <div className="h5 text-center text-uppercase">
          <span
            className={css`
              letter-spacing: 2px;
            `}
          >
            Использовать метеоры
          </span>
        </div>

        <Row className="my-3 px-3">
          <Col xs="auto">
            <span className="h5 mb-0">0</span>
          </Col>

          <Col>
            <input
              className="form-control"
              type="range"
              min={0}
              max={
                this.props.possibleMeteors < this.props.total
                  ? this.props.possibleMeteors
                  : this.props.total
              }
              value={this.state.choosenMeteors}
              onInput={this.handleChangeMeteors}
              onChange={this.handleChangeMeteors}
              step={10}
            />
          </Col>

          <Col xs="auto">
            <span className="h5 mb-0">
              {this.props.possibleMeteors < this.props.total
                ? this.props.possibleMeteors
                : this.props.total}
            </span>
          </Col>
        </Row>

        <Row className="my-3 mb-5 text-center text-uppercase">
          <Col>
            К оплате:{" "}
            <span className="h4 font-weight-bold">
              <span
                className={css`
                  color: ${this.props.theme.lightGreen};
                `}
              >
                {this.props.total - this.state.choosenMeteors}
                &nbsp;<small>JPY</small>
              </span>
            </span>
            {" и "}
            <span className="h4 font-weight-bold">
              <span
                className={css`
                  color: ${this.props.theme.orange};
                `}
              >
                {this.state.choosenMeteors}&nbsp;<small>метеоров</small>
              </span>
            </span>
          </Col>
        </Row>

        <Checkout />
      </div>
    )
  }
}

export default compose(
  withCart,
  withTheme
)(Cart)
