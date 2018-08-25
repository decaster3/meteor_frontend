import React from "react"
import {styled} from "../App/emotion"
import {PrimaryButton} from "../PrimaryButton"
import PromotionCreation from "./PromotionCreation"
import {Status, BASEURL} from "../../constants"
import {compose} from "redux"
import withPromotionBanner, {
  PromotionStateProps,
} from "../../containers/PromotionBanner"

const Image = styled("img")`
  width: 100%;
  margin-bottom: 16px;
`

const PromotionInfo = styled("p")`
  color: ${props => props.theme.lighterGrey};
  font-weight: 500;
  font-size: 18px;
  flex: 1;
`

const Promotions: React.StatelessComponent<PromotionStateProps> = props => (
  <div className="flex-grow-1 d-flex flex-column">
    <h1 className="mb-5">Акции</h1>
    <PromotionCreation />
    <div className="flex-grow-1 row">
      {props.promotionsStatus === Status.LOADED &&
        props.promotions.map(promo => (
          <div className="col-12 col-md-6 mb-5 d-flex flex-column">
            <Image src={`${BASEURL}/${promo.imageUrl}`} />
            <h2>За словесными горами</h2>
            <PromotionInfo>{promo.description}</PromotionInfo>
            {/* <div className="d-flex justify-content-center">
              <PrimaryButton>Заказать</PrimaryButton>
            </div> */}
          </div>
        ))}
    </div>
  </div>
)

export default compose(withPromotionBanner)(Promotions)