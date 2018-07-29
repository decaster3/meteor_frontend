import React, {SFC} from "react"
import withProducts, {ProductsProps} from "../containers/Products"
import {RouterProps, withRouter, RouteComponentProps} from "react-router"
import {compose} from "redux"

const ProductView: SFC<
  ProductsProps & RouteComponentProps<{category?: string; productId?: string}>
> = props => {
  // console.log(props.match)
  console.log(location.pathname.split("/").filter(x => x)[0])
  // return <ProductCard product={} />
  return <div />
}

export default compose(
  withRouter,
  withProducts
)(ProductView)
