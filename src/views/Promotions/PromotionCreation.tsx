import React from "react"
import withPromotionCreation, {
  PromotionCreationProps,
} from "../../containers/PromotionCreation"
import PromotionCreationForm from "./PromotionCreationForm"
import {compose} from "redux"
import CustomModal from "../CustomModal"

interface PromotionCreationViewState {
  modalShown: boolean
}

export class Categories extends React.Component<
  PromotionCreationProps,
  PromotionCreationViewState
> {
  state: PromotionCreationViewState = {
    modalShown: false,
  }

  handleSubmit = (values: any) => {
    this.props.createPromotion(
      values.get("image"),
      values.get("description"),
      values.get("name")
    )
  }

  toggle = () =>
    this.setState(prevState => ({modalShown: !prevState.modalShown}))

  render() {
    return (
      <>
        <button onClick={this.toggle}>Создать новую акцию</button>

        <CustomModal
          centered
          isOpen={this.state.modalShown || this.props.isPromotionCreating}
          toggle={this.toggle}
        >
          <h3 className="text-center">Создание акции</h3>
          <PromotionCreationForm
            promotionCreationStatus={this.props.isPromotionCreating}
            onSubmit={this.handleSubmit}
          />
        </CustomModal>
      </>
    )
  }
}

export default compose(withPromotionCreation)(Categories)
