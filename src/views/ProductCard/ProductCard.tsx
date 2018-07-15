import React from "react"
import _ from "lodash"

import {
  Product,
  ProductInstance,
  OptionConcat,
} from "../../containers/Product/actions"
import * as styles from "./ProductCard.module.scss"
import {CartProduct} from "../../containers/Cart/actions"
import {Row, Col} from "reactstrap"
import {cx} from "emotion"
import {BASEURL} from "../../constants"

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

  changeCurrentProduct = (optionId: number, valueId: number, value: string) => {
    const newState = _.cloneDeep(this.state.currentProductState)
    const valueForChangeId = newState.independentOptions.findIndex(
      io => optionId === io.optionId
    )
    const optionConcat: OptionConcat = {optionId, valueId, value}
    newState.independentOptions[valueForChangeId] = optionConcat
    const newProductInstance =
      this.props.product.instances.find(instance =>
        _(instance.independentOptions)
          .differenceWith(newState.independentOptions, _.isEqual)
          .isEmpty()
      ) || this.state.currentProductState
    this.setState({currentProductState: newProductInstance})
  }

  handleAddProductToCart = () => {
    this.props.addProductToCart({
      id: this.props.product.id,
      name: this.props.product.name,
      description: this.props.product.description,
      options: this.props.product.options,
      price: this.state.currentProductState.price,
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
                  // tslint:disable-next-line:jsx-no-lambda
                  onClick={() =>
                    this.changeCurrentProduct(
                      option.id,
                      optionName.id,
                      optionName.value
                    )
                  }
                  className={cx(styles.option, {
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
        <div className={cx(styles.name, "text-center")}>
          {this.props.product.name}
        </div>

        <div className={styles.imageContainer}>
          <img src={`${BASEURL}/${this.props.product.imageUrl}`} />
        </div>

        <div className={cx(styles.ingridients, "text-center")}>
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
