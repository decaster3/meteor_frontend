import {css} from "emotion"
import * as React from "react"
import {toast, ToastPosition} from "../../../node_modules/react-toastify"
import pizzaPlaceholder from "../../assets/pizza_placeholder.png"
import {CartProduct} from "../../containers/Cart/actions"
import {styled} from "../App/emotion"
import withGeolocation, {GeolocationProps} from "../../containers/Geolocation"

interface OrderHistoryProductProps {
  product: CartProduct
  orderCityId: number
  addProductToCart(product: CartProduct): void
}

interface OrderHistoryProductState {
  independentOptions: string[]
  dependentOptions: string[]
}

class OrderHistoryProduct extends React.Component<
  OrderHistoryProductProps & GeolocationProps,
  OrderHistoryProductState
> {
  static AddToCartButton = styled("button")`
    line-height: 1;
    padding: 8px;
    height: 36px;
  `

  static Option = styled("div")`
    white-space: nowrap;
  `

  constructor(props: OrderHistoryProductProps & GeolocationProps) {
    super(props)

    this.state = {
      independentOptions: [],
      dependentOptions: [],
    }

    props.product.instances[0].independentOptions.forEach(independentOption => {
      props.product.options.forEach(option => {
        if (option.id === independentOption.optionId) {
          option.optionValues.forEach(optionValue => {
            if (optionValue.id === independentOption.valueId) {
              this.state.independentOptions.push(optionValue.value)
            }
          })
        }
      })
    })

    this.state.independentOptions.sort()

    props.product.instances[0].dependentOptions.forEach(dependentOption => {
      props.product.options.forEach(option => {
        if (option.id === dependentOption.optionId) {
          option.optionValues.forEach(optionValue => {
            if (optionValue.id === dependentOption.valueId) {
              this.state.dependentOptions.push(optionValue.value)
            }
          })
        }
      })
    })

    this.state.dependentOptions.sort()
  }

  handleAddProduct = () => {
    if (this.props.orderCityId === this.props.defaultCity.id) {
      this.props.addProductToCart(this.props.product)
    } else {
      toast.error(
        "🦄 Вы не можете повторить заказ, который был сделан в другом городе!",
        {
          position: "top-right" as ToastPosition,
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        }
      )
    }
  }

  render() {
    return (
      <div className="row align-items-center mb-4 text-uppercase font-weight-bold text-center text-md-left">
        <div className="col-12 col-md-auto py-2 text-center">
          <img
            className={css`
              max-width: 100%;
              max-height: 96px;
            `}
            src={pizzaPlaceholder}
          />
        </div>

        <div className="col-12 col-md-3 mb-2 mb-md-0">
          <div>{this.props.product.name}</div>
          <div
            className={
              "d-flex flex-wrap justify-content-center justify-content-md-start text-lightgreen"
            }
          >
            {this.state.independentOptions.map((value, index) => (
              <OrderHistoryProduct.Option
                className="mx-2 mr-md-3 ml-md-0"
                key={index}
              >
                {value}
              </OrderHistoryProduct.Option>
            ))}

            {this.state.dependentOptions.map((value, index) => (
              <OrderHistoryProduct.Option
                className="mx-2 mr-md-3 ml-md-0"
                key={index}
              >
                {value}
              </OrderHistoryProduct.Option>
            ))}
          </div>
        </div>

        <div className="col-6 col-md-2 h4 mb-0 text-center">
          {this.props.product.instances[0].price.value}
          &nbsp;
          <small>{this.props.product.instances[0].price.currency}</small>
        </div>

        <div className="col-6 col-md-1 text-md-right">
          <span className="h4 mb-0">{this.props.product.count}</span>
        </div>

        <div className="col-12 col-md-3 py-3">
          <OrderHistoryProduct.AddToCartButton
            className="btn btn-outline-success"
            onClick={this.handleAddProduct}
          >
            Добавить в корзину
          </OrderHistoryProduct.AddToCartButton>
        </div>
      </div>
    )
  }
}

export default withGeolocation(OrderHistoryProduct)
