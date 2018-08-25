import React from "react"
import Icon from "react-fa"
import {compose} from "redux"
import {css, cx} from "emotion"
import symbol from "./logo_meteor.png"
import {Status, BASEURL} from "../../constants"
import defaultImage from "../../assets/default_banner.png"
import withPromotionBanner, {
  PromotionStateProps,
} from "../../containers/PromotionBanner"

const carouselId = "carousel"

const PromotionBanner: React.StatelessComponent<
  PromotionStateProps
> = props => {
  const {carouselItems, carouselIndicators} =
    props.promotionsStatus === Status.LOADED
      ? {
          carouselItems: props.promotions.map((img, index) => (
            <div className={cx("carousel-item", {active: index === 0})}>
              <img
                className="d-block w-100"
                src={`${BASEURL}/${img.imageUrl}`}
                alt="Promotion slide"
              />
            </div>
          )),
          carouselIndicators: props.promotions.map((img, index) => (
            <li
              data-target={`#${carouselId}`}
              data-slide-to={index}
              className={cx({active: index === 0})}
            />
          )),
        }
      : {
          carouselItems: [
            <div key={0} className="carousel-item active">
              <img
                className="d-block w-100"
                src={defaultImage}
                alt="Default promotion slide"
              />
            </div>,
          ],
          carouselIndicators: [
            <li
              key={0}
              data-target={`#${carouselId}`}
              data-slide-to={0}
              className="active"
            />,
          ],
        }
  return (
    <div
      className={css`
        height: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <div id={carouselId} className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">{carouselIndicators}</ol>
        <div className="carousel-inner">{carouselItems}</div>
        <a
          className="carousel-control-prev"
          href={`#${carouselId}`}
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href={`#${carouselId}`}
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  )
}

export default compose<any>(withPromotionBanner)(PromotionBanner)
