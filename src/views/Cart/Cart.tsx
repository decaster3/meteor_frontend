import * as React from "react"
import {compose} from "redux"
import withCart, {CartProps} from "../../containers/Cart"
import {CartProduct} from "../../containers/Cart/actions"
import CartProductView from "./CartProduct"
import Checkout from "../Checkout"
import Row from "reactstrap/lib/Row"
import Col from "reactstrap/lib/Col"

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
        <Row className="my-3">
          <Col>
            Итого:{" "}
            <span className="h5 font-weight-bold">{this.props.total}</span>
          </Col>

          <Col xs="auto">
            <span className="h5 font-weight-bold">
              {this.props.possibleMeteors}
            </span>{" "}
            метеоров в наличии
          </Col>
        </Row>
        <Row className="my-3">
          <Col xs="auto">
            <input
              className="form-control"
              readOnly={true}
              type="number"
              value={this.props.possibleMeteors - this.state.choosenMeteors}
            />{" "}
            метеоров оставить
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
            <input
              className="form-control"
              type="number"
              onInput={this.handleChangeMeteors}
              onChange={this.handleChangeMeteors}
              min={0}
              max={
                this.props.possibleMeteors < this.props.total
                  ? this.props.possibleMeteors
                  : this.props.total
              }
              step={10}
              value={this.state.choosenMeteors}
            />{" "}
            метеоров потратить
          </Col>
        </Row>
        <Row className="my-3 mb-5">
          <Col>
            К оплате:{" "}
            <span className="h5 font-weight-bold">
              {this.props.total - this.state.choosenMeteors}
            </span>
          </Col>

          <Col xs="auto">
            <span className="h5 font-weight-bold">
              {this.props.possibleMeteors - this.state.choosenMeteors}
            </span>{" "}
            метеоров останется
          </Col>
        </Row>
        <Checkout />
      </div>
    )
  }
}

export default compose(withCart)(Cart)
