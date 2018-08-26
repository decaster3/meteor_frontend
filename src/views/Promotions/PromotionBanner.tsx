import React from "react"
import {compose} from "redux"
import {css, cx} from "emotion"
import {Status, BASE_URL} from "../../constants"
import defaultImage from "../../assets/default_banner.png"
import withPromotionBanner, {PromotionProps} from "../../containers/Promotions"

const carouselId = "carousel"

const PromotionBanner: React.StatelessComponent<PromotionProps> = props => {
  const {carouselItems, carouselIndicators} =
    props.promotionsStatus === Status.LOADED && props.promotions.length > 0
      ? {
          carouselItems: props.promotions.map((img, index) => (
            <div
              key={index}
              className={cx("carousel-item", {active: index === 0})}
            >
              <img
                className="d-block w-100"
                src={`${BASE_URL}/${img.imageUrl}`}
                alt="Promotion slide"
              />
            </div>
          )),
          carouselIndicators: props.promotions.map((img, index) => (
            <li
              key={index}
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

export default compose(withPromotionBanner)(PromotionBanner)
