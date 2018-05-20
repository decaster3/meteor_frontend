import * as React from "react"
import Icon from "react-fa"
import * as cn from "classnames"
import symbol from "./logo_meteor.png"
import {Status} from "../../constants"
// @ts-ignore
import * as styles from "./Menu.module.scss"
import defaultImage from "./default_banner.png"

const carouselId = "carousel"

const PromotionBanner = (props: {banners: any[]; bannersStatus: string}) => {
  let bannersView: any = (
    <div className="carousel-item active">
      <img className="d-block w-100" src={defaultImage} alt="First slide" />
    </div>
  )
  if (props.bannersStatus === Status.LOADED) {
    bannersView = props.banners.map((img: any) => (
      <div className="carousel-item active">
        <img className="d-block w-100" src={img.src} alt="First slide" />
      </div>
    ))
  }
  return (
    <div className={cn("col-auto", styles.carouselWrapper)}>
      <div className={styles.carousel}>
        <div id={carouselId} className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li
              data-target={`#${carouselId}`}
              data-slide-to="0"
              className="active"
            />
            <li data-target={`#${carouselId}`} data-slide-to="1" />
            <li data-target={`#${carouselId}`} data-slide-to="2" />
          </ol>
          <div className="carousel-inner">{bannersView}</div>
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
    </div>
  )
}

export default PromotionBanner
