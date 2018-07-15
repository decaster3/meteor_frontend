import React from "react"
import {reduxForm, Field, FieldArray} from "redux-form/immutable"
import {PulseLoader} from "react-spinners"
import {InjectedFormProps} from "redux-form"
import {Map as ImmutableMap, fromJS} from "immutable"

import {renderDropzoneInput} from "../../forms/DropzoneField"
import {OptionName} from "../../containers/Product/actions"
import CustomInput from "../../forms/CustomInput"

interface ProductCreationForm {
  productCreationStatus: boolean
  optionNames: OptionName[]
}

interface ProductCreationData {
  image: any
  price: string
}

type ImmutableMapOfProductCreationData = ImmutableMap<
  keyof ProductCreationData,
  string
>

const ProductCreation: React.StatelessComponent<
  ProductCreationForm &
    InjectedFormProps<ImmutableMapOfProductCreationData, ProductCreationForm>
> = props => {
  const renderOptions = ({fields}: any) => (
    <ul>
      <li>
        <button
          type="button"
          onClick={
            // tslint:disable-next-line:jsx-no-lambda
            () => fields.insert(fields.length, fromJS({}))
          }
        >
          Добавить вариацию продукта
        </button>
      </li>
      {fields.map((opt: OptionName, index: number) => {
        const options = props.optionNames.map(option => (
          <div key={option.id} className="form-group row">
            <label className="col-4 col-form-label" htmlFor="phone">
              {`${option.name} - ${
                option.isCharacteristic ? "Характеристика" : "Вариант"
              }`}
            </label>
            <div className="col-8">
              <Field
                component={CustomInput}
                name={`${opt}.${option.name}`}
                props={{
                  id: option.name,
                  type: option.name,
                  placeholder: option.name,
                  autoComplete: option.name,
                }}
              />
            </div>
          </div>
        ))
        return (
          <div key={index} className="my-3">
            <h4>Вариация #{index + 1}</h4>
            {options}
            <div className="form-group row">
              <label className="col-4 col-form-label" htmlFor="phone">
                Цена
              </label>
              <div className="col-8">
                <Field
                  component={CustomInput}
                  name={`${opt}.price`}
                  props={{
                    id: "price",
                    type: "price",
                    placeholder: "цена",
                    autoComplete: "price",
                  }}
                />
              </div>
            </div>
          </div>
        )
      })}
    </ul>
  )

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="image" component={renderDropzoneInput} />
      </div>
      <div className="form-group row">
        <label className="col-4 col-form-label" htmlFor="phone">
          Название
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
      </div>
      <div className="form-group row">
        <label className="col-4 col-form-label" htmlFor="phone">
          Описание продукта
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
      <FieldArray name="options" component={renderOptions} />
      <div style={{color: "red", textAlign: "center"}}>
        {props.error && <strong>{props.error}</strong>}
      </div>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-success m-4"
          type="submit"
          disabled={props.productCreationStatus}
        >
          {props.productCreationStatus ? (
            <PulseLoader color={"#ffffff"} size={8} />
          ) : (
            <span>Cоздать</span>
          )}
        </button>
      </div>
    </form>
  )
}

const validateProductCreationFrom = (
  values: ImmutableMapOfProductCreationData
) => ({} as any)

export default reduxForm<
  ImmutableMapOfProductCreationData,
  ProductCreationForm
>({
  form: "ProductCreationForm",
  validate: validateProductCreationFrom,
})(ProductCreation)
