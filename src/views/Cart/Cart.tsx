import React from "react"
import {compose} from "redux"
import EmptyCart from "./EmptyCart"
import withCart, {CartProps} from "../../containers/Cart"
import withGeolocation, {GeolocationProps} from "../../containers/Geolocation"
import {withUser, UserProps} from "../../containers/UserSession"
import CartProductView from "./CartProduct"
import {css} from "emotion"
import {withTheme} from "emotion-theming"
import {ThemeProps} from "../App/emotion"
import {StickyContainer, Sticky} from "react-sticky"
import {PrimaryButtonAsLink, PrimaryButton} from "../PrimaryButton"
import {UserState} from "../../containers/UserSession/constants"

interface CartState {
  choosenMeteors: number
}

class Cart extends React.Component<
  UserProps & CartProps & ThemeProps & GeolocationProps,
  CartState
> {
  state: CartState = {
    choosenMeteors: this.props.meteors,
  }

  componentDidMount() {
    if (this.props.userState === UserState.LOGED_IN) {
      this.props.getUserInfo()
    }
  }

  componentWillUnmount() {
    this.props.changeMeteors(this.state.choosenMeteors)
  }

  handleChangeMeteors = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({choosenMeteors: parseInt(event.currentTarget.value, 10)})
  }

  render() {
    return (
      <div>
        <h2>Корзина</h2>

        {this.props.products.length > 0 ? (
          <div className="row mb-5">
            <div className="col-12 col-lg-8">
              {this.props.products.map(product => (
                <CartProductView
                  key={product.instances[0].id}
                  product={product}
                  addProductToCart={this.props.addProductToCart}
                  removeProductFromCart={this.props.removeProductFromCart}
                />
              ))}
            </div>

            <StickyContainer className="col-12 col-lg-4">
              {this.props.possibleMeteors > 0 && (
                <Sticky topOffset={-56} bottomOffset={56}>
                  {({style, isSticky}: any) => (
                    <div style={{...style, ...{marginTop: isSticky ? 56 : 0}}}>
                      <div>
                        <div className="h5 mt-3 text-center text-uppercase">
                          <span
                            className={css`
                              letter-spacing: 1px;
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
                      </div>
                      <div className="row my-3 mb-5 text-center text-uppercase">
                        <div className="col">
                          <div
                            className={
                              this.props.possibleMeteors > 0
                                ? "mb-1"
                                : "h4 mb-1"
                            }
                          >
                            К оплате:
                          </div>
                          <div className="h4 mb-0 font-weight-bold">
                            <span
                              className={css`
                                line-height: 1.5;
                                color: ${this.props.theme.lightGreen};
                              `}
                            >
                              {this.props.total - this.state.choosenMeteors}
                              &nbsp;
                              <small>{this.props.defaultCity.currency}</small>
                            </span>
                          </div>
                          {this.props.possibleMeteors > 0 && (
                            <div className="h4 mb-0 font-weight-bold">
                              <span
                                className={css`
                                  line-height: 1.5;
                                  color: ${this.props.theme.orange};
                                `}
                              >
                                {this.state.choosenMeteors}
                                &nbsp;
                                <small>метеоров</small>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Sticky>
              )}
            </StickyContainer>
          </div>
        ) : (
          <EmptyCart />
        )}

        {!this.props.isDeliveryAvailable && (
          <div className="h3 text-warning text-center">
            Только запланированный заказ
          </div>
        )}

        {this.props.total >
        this.props.defaultCity.minimalOrderPrice + this.state.choosenMeteors ? (
          <div className="row justify-content-center my-3">
            <div className="col-auto">
              <PrimaryButtonAsLink to="/checkout">
                Офромить заказ
              </PrimaryButtonAsLink>
            </div>
          </div>
        ) : (
          <>
            <div className="row justify-content-center my-3">
              <div className="col-auto">
                <PrimaryButton className="disabled" disabled>
                  Офромить заказ
                </PrimaryButton>
              </div>
            </div>
            <div className="my-3 text-center text-danger">
              {`Сумма заказа должна быть выше ${
                this.props.defaultCity.minimalOrderPrice
              } `}
              <small>{this.props.defaultCity.currency}</small>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default compose(
  withCart,
  withGeolocation,
  withUser,
  withTheme
)(Cart)
