import React from "react"
import {reduxForm, Field, FieldArray} from "redux-form/immutable"
import {PulseLoader} from "react-spinners"
import {InjectedFormProps} from "redux-form"
import {Map as ImmutableMap, fromJS} from "immutable"

import {renderDropzoneInput} from "../../forms/DropzoneField"
import CustomInput from "../../forms/CustomInput"

interface PromotionCreationForm {
  promotionCreationStatus: boolean
}

interface PromotionCreationData {
  image: any
  description: string
}

type ImmutableMapOfPromotionCreationData = ImmutableMap<
  keyof PromotionCreationData,
  string
>

const PromotionCreation: React.StatelessComponent<
  PromotionCreationForm &
    InjectedFormProps<
      ImmutableMapOfPromotionCreationData,
      PromotionCreationForm
    >
> = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="image" component={renderDropzoneInput} />
      </div>
      <div className="form-group row">
        <label className="col-4 col-form-label" htmlFor="phone">
          Название акции
        </label>
        <div className="col-8">
          <Field
            component={CustomInput}
            name={"name"}
            props={{
              id: "name",
              type: "name",
              placeholder: "название",
              autoComplete: "name",
            }}
          />
        </div>
        <label className="col-4 col-form-label" htmlFor="phone">
          Описание акции
        </label>
        <div className="col-8">
          <Field
            component={CustomInput}
            name={"description"}
            props={{
              id: "description",
              type: "description",
              placeholder: "описание",
              autoComplete: "description",
            }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-success m-4" type="submit" disabled={false}>
          {false ? (
            <PulseLoader color={"#ffffff"} size={8} />
          ) : (
            <span>Cоздать</span>
          )}
        </button>
      </div>
    </form>
  )
}

const validatePromotionCreationFrom = (
  values: ImmutableMapOfPromotionCreationData
) => ({} as any)

export default reduxForm<
  ImmutableMapOfPromotionCreationData,
  PromotionCreationForm
>({
  form: "PromotionCreationForm",
  validate: validatePromotionCreationFrom,
})(PromotionCreation)
