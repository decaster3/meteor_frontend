import React from "react"
import {compose} from "redux"
import withCart, {CartProps} from "../../containers/Cart"
import CartProductView from "./CartProduct"
import Checkout from "../Checkout"
import {css} from "emotion"
import {withTheme} from "emotion-theming"
import {ThemeProps} from "../App/Theme"
import {StickyContainer, Sticky} from "react-sticky"

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

        <div className="row">
          <div className="col-12 col-lg-8 d-flex flex-column justify-content-center">
            {this.props.products.map(product => (
              <CartProductView
                key={product.instance.id}
                product={product}
                addProductToCart={this.props.addProductToCart}
                removeProductFromCart={this.props.removeProductFromCart}
              />
            ))}
          </div>

          <StickyContainer className="col-12 col-lg-4">
            <Sticky topOffset={-56} bottomOffset={56}>
              {({style, isSticky}: any) => (
                <div style={{...style, ...{marginTop: isSticky ? 56 : 0}}}>
                  <div className="h5 mt-3 text-center text-uppercase">
                    <span
                      className={css`
                        letter-spacing: 2px;
                      `}
                    >
                      Использовать метеоры
                    </span>
                  </div>

                  <div className="row my-3 px-sm-3">
                    <div className="col-auto">
                      <span className="h5 mb-0">0</span>
                    </div>

                    <div className="col">
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
                    </div>

                    <div className="col-auto">
                      <span className="h5 mb-0">
                        {this.props.possibleMeteors < this.props.total
                          ? this.props.possibleMeteors
                          : this.props.total}
                      </span>
                    </div>
                  </div>

                  <div className="row my-3 mb-5 text-center text-uppercase">
                    <div className="col">
                      <div>{"К оплате: "}</div>
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
                          {this.state.choosenMeteors}&nbsp;<small>
                            метеоров
                          </small>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Sticky>
          </StickyContainer>
        </div>

        <Checkout />
      </div>
    )
  }
}

export default compose(
  withCart,
  withTheme
)(Cart)
