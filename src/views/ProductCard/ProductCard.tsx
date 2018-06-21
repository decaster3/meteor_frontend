import * as React from "react"
import * as _ from "lodash"
import * as classnames from "classnames"

import {
  Product,
  Option,
  ProductInstance,
  OptionConcat,
} from "../../containers/Product/actions"
import * as styles from "./ProductCard.module.scss"
import {CartProduct} from "../../containers/Cart/actions"
import {Row, Col} from "reactstrap"

interface ProductCardProps {
  product: Product
  addProductToCart(product: CartProduct): void
}
interface ProductCardState {
  currentProductState: ProductInstance
}

class ProductCard extends React.Component<ProductCardProps, ProductCardState> {
  state: ProductCardState = {
    currentProductState: _.cloneDeep(this.props.product.instances[0]),
  }

  changeCurrentProduct = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    const optionConcat: OptionConcat = {
      optionId: parseInt(event.currentTarget.name, 10),
      valueId: parseInt(event.currentTarget.value, 10),
    }
    const newState = _.cloneDeep(this.state.currentProductState)
    const valueForChangeId = newState.dependentOptions.findIndex(
      (el: OptionConcat) => optionConcat.optionId === el.optionId
    )
    newState.dependentOptions[valueForChangeId] = optionConcat
    const newProductInstance =
      this.props.product.instances.find((instance: ProductInstance) => {
        return _(instance.dependentOptions)
          .differenceWith(newState.dependentOptions, _.isEqual)
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
    this.props.product.options.map(option => {
      const currentOptionValue = this.state.currentProductState.independentOptions.find(
        currentOption => currentOption.optionId === option.id
      )
      if (currentOptionValue && !option.isCharacteristic) {
        return (
          <Row className={"my-2"} noGutters={true} key={option.id}>
            {option.optionValues.map(optionName => (
              <Col className="text-center" key={optionName.id}>
                <button
                  type="button"
                  name={option.id.toString()}
                  value={optionName.id}
                  onClick={this.changeCurrentProduct}
                  className={classnames(styles.option, {
                    [styles.optionActive]:
                      currentOptionValue.valueId === optionName.id,
                  })}
                >
                  {optionName.value}
                </button>
              </Col>
            ))}
          </Row>
        )
      } else {
        return null
      }
    })

  renderDependentOptions = () => {
    return this.props.product.options.map(option => {
      const currentOptionValue = this.state.currentProductState.dependentOptions.find(
        currentOption => currentOption.optionId === option.id
      )
      if (currentOptionValue && option.isCharacteristic) {
        return (
          <Row key={option.id} className={styles.dependentOption}>
            <Col>
              <small>{option.name}</small>
            </Col>
            {option.optionValues.map(optionName => {
              if (currentOptionValue.valueId === optionName.id) {
                return (
                  <Col
                    key={optionName.id}
                    xs="auto"
                    className="font-weight-bold"
                  >
                    {optionName.value}
                  </Col>
                )
              } else {
                return null
              }
            })}
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
        <div className={classnames(styles.name, "text-center")}>
          {this.props.product.name}
        </div>

        <div className={styles.imageContainer}>
          <img
            src={`https://picsum.photos/300/200/?blue&image=${
              this.state.currentProductState.id
            }`}
          />
        </div>

        <div className={classnames(styles.ingridients, "text-center")}>
          {this.props.product.description}
        </div>

        {this.renderIndependentOptions()}

        {this.renderDependentOptions()}

        <button onClick={this.handleAddProductToCart} className={styles.order}>
          {this.state.currentProductState.price.value}
          <small>{this.state.currentProductState.price.currency}</small> Order
        </button>
      </div>
    )
  }
}
export default ProductCard
