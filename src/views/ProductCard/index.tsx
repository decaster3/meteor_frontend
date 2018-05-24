import * as React from "react"
import * as _ from "lodash"
import * as classnames from "classnames"

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

  renderIndependentOptions = () =>
    this.props.product.options.map((option: Option) => {
      const currentOptionValue = this.state.currentProductState.notBelongingOptions.find(
        (currentOption: OptionConcat) => currentOption.optionId === option.id
      )
      if (currentOptionValue && !option.isBelongs) {
        return (
          <Row className={"my-2"} noGutters={true} key={option.id}>
            {option.optionValues.map(
              (optionName: {value: string; id: number}) => (
                <Col className="text-center" key={optionName.id}>
                  <button
                    type="button"
                    // htmlFor={optionName.value}
                    onClick={this.changeCurrentProduct({
                      optionId: option.id,
                      valueId: optionName.id,
                    })}
                    className={classnames(styles.option, {
                      [styles.optionActive]:
                        currentOptionValue.valueId === optionName.id,
                    })}
                  >
                    {optionName.value}
                  </button>
                </Col>
              )
            )}
          </Row>
        )
      } else {
        return null
      }
    })

  renderDependentOptions = () => {
    return this.props.product.options.map((option: Option) => {
      const currentOptionValue = this.state.currentProductState.belongingOptions.find(
        (currentOption: OptionConcat) => currentOption.optionId === option.id
      )
      if (currentOptionValue && option.isBelongs) {
        return (
          <Row className={styles.dependentOption}>
            <Col>
              <small>{option.name}</small>
            </Col>
            {option.optionValues.map(
              (optionName: {value: string; id: number}) => {
                if (currentOptionValue.valueId === optionName.id) {
                  return (
                    <Col xs="auto" key={optionName.id}>
                      {optionName.value}
                    </Col>
                  )
                } else {
                  return null
                }
              }
            )}
          </Row>
        )
      } else {
        return null
      }
    })
  }

  render() {
    return (
      <div className={styles.productCard}>
        <div className={styles.imageContainer}>
          <img src="http://placekitten.com/300/200" />
        </div>
        <div className={styles.name}>{this.props.product.name}</div>
        <div className={styles.ingridients}>
          {this.props.product.description}
        </div>
        {this.renderIndependentOptions()}
        {this.renderDependentOptions()}
        {/* <div className={styles.price}>
          {this.state.currentProductState.price.value}
          <small>{this.state.currentProductState.price.currency}</small>
        </div> */}
        <button onClick={this.handleAddProductToCart} className={styles.order}>
          {this.state.currentProductState.price.value}
          <small>{this.state.currentProductState.price.currency}</small> Order
        </button>
      </div>
    )
  }
}
export default ProductView