import React from "react"
import {WrappedFieldProps} from "redux-form"
import Icon from "react-fa"
import * as styles from "./Dropzone.module.scss"
import classnames from "classnames"
import Dropzone from "react-dropzone"

interface CustomDropzoneProps {
  name?: string
}

export const renderDropzoneInput = ({
  input,
  meta: {touched, error, warning, autofilled} = {
    touched: undefined,
    error: undefined,
    warning: undefined,
    autofilled: undefined,
  },
  name,
}: CustomDropzoneProps & WrappedFieldProps) => {
  const handleOnDrop = (filesToUpload: any) => {
    input.onChange(filesToUpload)
  }
  return (
    <div className="text-center">
      <Dropzone
        className={classnames(
          styles.dropzone,
          "d-flex align-items-center justify-content-center"
        )}
        name={name}
        onDrop={handleOnDrop}
      >
        <div className={styles.baseInfo}>
          <Icon className={styles.icon} name="upload" />Перетащите или{" "}
          <span className={styles.info}>выбирите фото продукта</span>
        </div>
      </Dropzone>
      {touched && error && <span>{error}</span>}
      {input.value &&
        Array.isArray(input.value) && (
          <div className="m-3">
            {input.value.map((file, i) => (
              <div
                className={classnames(
                  styles.card,
                  "d-flex justify-content-start align-items-center"
                )}
                key={i}
              >
                <Icon className={styles.icon} name="file-text-o" />
                <div className="d-flex align-items-start flex-column">
                  <span className={styles.cardText}>{file.name}</span>
                  <div className={styles.baseInfo}>{file.size / 1000} KB</div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}
