import * as React from "react"
import * as _ from "lodash"
import {
  Product,
  Option,
  ProductInstance,
  OptionConcat,
} from "../../containers/Menu/actions"
// @ts-ignore
import styles from "./ProductCard.module.scss"

interface ProductProps {
  product: Product
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
  changeCurrentProduct = (optionConcat: OptionConcat) => {
    const newState = _.cloneDeep(this.state.currentProductState)
    const valueForChangeId = newState.options.findIndex(
      (el: OptionConcat) => optionConcat.option_id === el.option_id
    )
    newState.options[valueForChangeId] = optionConcat
    const newProductInstance =
      this.props.product.instances.find((instance: ProductInstance) => {
        return _(instance.options)
          .differenceWith(newState.options, _.isEqual)
          .isEmpty()
      }) || this.state.currentProductState
    this.setState({currentProductState: newProductInstance})
  }

  renderBelongsOptions = () => {
    return this.props.product.options.map((option: Option) => {
      const currentOptionValue = this.state.currentProductState.options.find(
        (currentOption: OptionConcat) => currentOption.option_id === option.id
      )
      if (currentOptionValue && option.isBelongs) {
        const row = option.values.map(
          (optionName: {value: string; id: number}) => {
            return (
              <div key={optionName.id}>
                {currentOptionValue.value_id === optionName.id ? (
                  <p>current</p>
                ) : (
                  <p>not current</p>
                )}
                <button
                  onClick={
                    /*tslint:disable-next-line:jsx-no-lambda*/ () =>
                      this.changeCurrentProduct({
                        option_id: option.id,
                        value_id: optionName.id,
                      })
                  }
                >
                  Click
                </button>
                {optionName.value}
              </div>
            )
          }
        )
        return <div key={option.id}>{row}</div>
      }
      return null
    })
  }
  renderNotBelongsOptions = () => {
    return this.props.product.options.map((option: Option) => {
      const currentOptionValue = this.state.currentProductState.notBelongsOptions.find(
        (currentOption: OptionConcat) => currentOption.option_id === option.id
      )
      if (currentOptionValue && !option.isBelongs) {
        const item = option.values.map(
          (optionName: {value: string; id: number}) => {
            if (currentOptionValue.value_id === optionName.id) {
              return <div>{optionName.value}</div>
            }
            return null
          }
        )
        return item
      }
      return null
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
        <button className={styles.order}>Order</button>
      </div>
    )
  }
}
export default ProductView
