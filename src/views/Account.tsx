import React from "react"
import {cx, css} from "emotion"
import {withTheme} from "emotion-theming"
import {compose} from "redux"
import {ThemeProps} from "./App/Theme"

const Account: React.SFC<ThemeProps> = props => (
  <div>
    <div
      className={cx(
        "row align-items-center my-5",
        css`
          color: ${props.theme.lighterGrey};
          font-weight: 500;
          line-height: 3;
        `
      )}
    >
      <div className="col text-center">
        <img
          className="rounded-circle"
          src={`https://picsum.photos/200/200/?blue`}
        />
      </div>
      <div className="col">
        <div>Иван Иванов</div>
        <div>ivan.ivanov@example.com</div>
        <div>+7 999 123 45 67</div>
      </div>
      <div className="col text-center">12 метеоров</div>
    </div>
  </div>
)

export default compose(withTheme)(Account)
