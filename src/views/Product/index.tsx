import * as React from "react"
import * as _ from "lodash"

import {
  Product,
  Option,
  ProductInstance,
  OptionConcat,
} from "../../containers/Menu/actions"
import * as styles from "./index.module.scss"
import {CartProduct} from "../../containers/Cart/actions"
import {Row, Col} from "reactstrap"

interface ProductProps {
  product: Product
  addProductToCart(product: CartProduct): void
}
interface ProductState {
  currentProductState: ProductInstance
}

class ProductView extends React.Component<ProductProps, ProductState> {
  constructor(props: ProductProps) {
    super(props)
    this.state = {
      currentProductState: _.cloneDeep(this.props.product.instances[0]),
    }
  }

  changeCurrentProduct = (optionConcat: OptionConcat) => () => {
    const newState = _.cloneDeep(this.state.currentProductState)
    const valueForChangeId = newState.notBelongingOptions.findIndex(
      (el: OptionConcat) => optionConcat.optionId === el.optionId
    )
    newState.notBelongingOptions[valueForChangeId] = optionConcat
    const newProductInstance =
      this.props.product.instances.find((instance: ProductInstance) => {
        return _(instance.notBelongingOptions)
          .differenceWith(newState.notBelongingOptions, _.isEqual)
          .isEmpty()
      }) || this.state.currentProductState
    this.setState({currentProductState: newProductInstance})
  }

  handleAddProductToCart = () => {
    this.props.addProductToCart({
      id: this.props.product.id,
      name: this.props.product.name,
      description: this.props.product.description,
      options: this.props.product.options,
      instance: this.state.currentProductState,
      count: 1,
    })
  }

  renderBelongsOptions = () =>
    this.props.product.options.map((option: Option) => {
      const currentOptionValue = this.state.currentProductState.notBelongingOptions.find(
        (currentOption: OptionConcat) => currentOption.optionId === option.id
      )
      if (currentOptionValue && !option.isBelongs) {
        return (
          <Row key={option.id}>
            {option.optionValues.map(
              (optionName: {value: string; id: number}) => (
                <Col className="text-center" key={optionName.id}>
                  <button
                    className="btn"
                    onClick={this.changeCurrentProduct({
                      optionId: option.id,
                      valueId: optionName.id,
                    })}
                  >
                    {optionName.value}
                  </button>
                  {currentOptionValue.valueId === optionName.id ? (
                    <p>Chosen</p>
                  ) : (
                    <p>Not chosen</p>
                  )}
                </Col>
              )
            )}
          </Row>
        )
      } else {
        return null
      }
    })

  renderNotBelongsOptions = () => {
    return this.props.product.options.map((option: Option) => {
      const currentOptionValue = this.state.currentProductState.belongingOptions.find(
        (currentOption: OptionConcat) => currentOption.optionId === option.id
      )
      if (currentOptionValue && option.isBelongs) {
        return option.optionValues.map(
          (optionName: {value: string; id: number}) => {
            if (currentOptionValue.valueId === optionName.id) {
              return <div key={optionName.id}>{optionName.value}</div>
            } else {
              return null
            }
          }
        )
      } else {
        return null
      }
    })
  }

  render() {
    return (
      <div className={styles.productCard}>
        <div className={styles.imgContainer}>
          <img src="http://placekitten.com/300/200" />
        </div>
        <div className={styles.name}>{this.props.product.name}</div>
        <div className={styles.ingridients}>
          {this.props.product.description}
        </div>
        <div>
          {this.renderBelongsOptions()}
          {this.renderNotBelongsOptions()}
        </div>
        <div className={styles.price}>
          {this.state.currentProductState.price.value}
          <small>{this.state.currentProductState.price.currency}</small>
        </div>
        <button onClick={this.handleAddProductToCart} className={styles.order}>
          Order
        </button>
      </div>
    )
  }
}
export default ProductView
