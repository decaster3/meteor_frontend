import React from "react"
import {withUser, UserStateProps} from "../containers/UserSession"
import withGeolocation, {GeolocationProps} from "../containers/Geolocation"
import {compose} from "redux"
import {styled, theme} from "./App/emotion"

const InviteLinkContainer = styled("div")`
  border-style: dashed;
  border-color: ${theme.orange};
  height: 100px;
  margin-top: 24px;

  border-width: 5px;
  border-radius: 5px;
`
const CopyButton = styled("button")`
  background-color: ${theme.lightGreen};
  color: white;
  text-transform: uppercase;
  font-weight: 500;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  letter-spacing: 0.125em;

  &:focus,
  &:hover {
    background-color: ${theme.darkGreen};
  }
`
const OrangeSpan = styled("span")`
  color: ${theme.orange};
`

const BonusSystemDescription: React.StatelessComponent<
  UserStateProps & GeolocationProps
> = props => {
  return (
    <>
      <div className="text-center">
        <span className="h1 mb-5">Дружить выгодно! 🚀🚀🚀 </span>
        <p className="h4 mt-5 ">
          Получите{" "}
          <OrangeSpan>
            {props.defaultCity.inviteBonus} {props.defaultCity.currency}
          </OrangeSpan>{" "}
          за каждого друга, приглашенного на{" "}
          <OrangeSpan>Meteorfood.com</OrangeSpan>. Когда ваш друг
          зарегестрируется по вашей реферальной ссылке и сделает заказ, вы
          получите бонусы.
        </p>
        <InviteLinkContainer className="row align-items-center justify-content-center text-center mx-5">
          <input
            className="form-control col-6"
            value={`https://meteorfood.com/invite/${props.userInfo.token}`}
          />
          <CopyButton className="form-control col-3">Скопировать!</CopyButton>
        </InviteLinkContainer>
        <p className="h4 mt-5 mx-5">
          Так же в течение месяца вы будете получать процент с его покупок в
          виде бонусов!
        </p>
      </div>
    </>
  )
}

export default compose<any>(
  withUser,
  withGeolocation
)(BonusSystemDescription)
