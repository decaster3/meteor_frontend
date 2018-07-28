import React, {SFC} from "react"
import withProducts, {ProductsProps} from "../containers/Products"
import {RouterProps, withRouter} from "react-router"
import {compose} from "redux"

const ProductView: SFC<ProductsProps & RouterProps> = props => (
  <div>Product View</div>
)

export default compose(
  withProducts,
  withRouter
)(ProductView)
