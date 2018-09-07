import React from "react"
import {styled} from "../App/emotion"
import {withUser, UserStateProps} from "../../containers/UserSession"
import PromotionCreation from "./PromotionCreation"
import {Status, BASE_URL} from "../../constants"
import {compose} from "redux"
import withPromotions, {PromotionProps} from "../../containers/Promotions"

const Image = styled("img")`
  width: 100%;
  margin-bottom: 16px;
`

const Promotions: React.StatelessComponent<
  PromotionProps & UserStateProps
> = props => (
  <div className="flex-grow-1 d-flex flex-column">
    <h1 className="mb-5">Акции</h1>
    {props.userInfo.role === "admin" && <PromotionCreation />}
    <div className="flex-grow-1 row">
      {props.promotionsStatus === Status.LOADED &&
        props.promotions.map(promo => (
          <div
            className="col-12 col-md-6 mb-5 d-flex flex-column"
            key={promo.id}
          >
            <Image src={`${BASE_URL}/${promo.imageUrl}`} />
            <h2>{promo.name}</h2>
            <p className="h5 flex-grow-1 text-lightergrey">
              {promo.description}
            </p>
          </div>
        ))}
    </div>
  </div>
)

export default compose(
  withPromotions,
  withUser
)(Promotions)
