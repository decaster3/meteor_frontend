import React from "react"
import {styled} from "../App/emotion"
import {withUser, UserStateProps} from "../../containers/UserSession"
import PromotionCreation from "./PromotionCreation"
import {Status, API_URL} from "../../constants"
import {compose} from "redux"
import withPromotions, {PromotionProps} from "../../containers/Promotions"

const Image = styled("img")`
  width: 100%;
  margin-bottom: 16px;
`

const Promotions: React.StatelessComponent<
  PromotionProps & UserStateProps
> = props => {
  const renderPromotions = () => {
    if (props.promotions) {
      return props.promotions.map(promo => (
        <div className="col-12 col-md-6 mb-5 d-flex flex-column" key={promo.id}>
          <Image src={`${API_URL}/${promo.imageUrl}`} />
          <h2>{promo.name}</h2>
          <p className="h5 flex-grow-1 text-lightergrey">{promo.description}</p>
        </div>
      ))
    } else if (props.error) {
      return <div>Ошибка загрузки, проверьте соединение с интернетом</div>
    } else if (props.isLoading) {
      return <div>Загрузка</div>
    } else {
      return <div>Ошибка</div>
    }
  }
  return (
    <div className="flex-grow-1 d-flex flex-column">
      <h1 className="mb-5">Акции</h1>
      {props.userInfo.role === "admin" && <PromotionCreation />}
      <div className="flex-grow-1 row">{renderPromotions()}</div>
    </div>
  )
}

export default compose(
  withPromotions,
  withUser
)(Promotions)
