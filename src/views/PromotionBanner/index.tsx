import * as React from "react"
import Icon from "react-fa"
import * as classnames from "classnames"

import symbol from "./logo_meteor.png"
import {Status} from "../../constants"
import * as styles from "./index.module.scss"
import defaultImage from "./default_banner.png"

const carouselId = "carousel"

const PromotionBanner = (props: {
  banners: Array<{src: string}>
  bannersStatus: Status
}) => {
  const {carouselItems, carouselIndicators} =
    props.bannersStatus === Status.LOADED
      ? {
          carouselItems: props.banners.map((img, index) => (
            <div className={classnames("carousel-item", {active: index === 0})}>
              <img
                className="d-block w-100"
                src={img.src}
                alt="Promotion slide"
              />
            </div>
          )),
          carouselIndicators: props.banners.map((img, index) => (
            <li
              data-target={`#${carouselId}`}
              data-slide-to={index}
              className={classnames({active: index === 0})}
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
    <div className={styles.carousel}>
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

export default PromotionBanner
