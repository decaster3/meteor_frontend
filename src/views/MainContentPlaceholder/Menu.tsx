import * as React from "react"
import Icon from "react-fa"
import * as cn from "classnames"
import symbol from "./logo_meteor.png"

// @ts-ignore
import * as styles from "./Menu.module.scss"

const carouselId = "carousel"

const Menu = () => (
  <>
    <div className="row align-items-center">
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
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src="http://via.placeholder.com/800x600"
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="http://via.placeholder.com/800x600"
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="http://via.placeholder.com/800x600"
                  alt="Third slide"
                />
              </div>
            </div>
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

      <div className={cn("col", styles.signupBannerWrapper)}>
        <div className={cn("row align-items-center", styles.signupBanner)}>
          <div className={cn("col", styles.textBanner)}>
            <button className={styles.signupButton}>Зарегестрируйся</button>
            <div>и получи</div>
            <div className={styles.meteorValue}>500</div>
            <div className={styles.meteorCurrency}>метеоров</div>
            <div>Чтобы обменять их на еду</div>
          </div>
          <div className={cn("col-auto", styles.signupBannerImageWrapper)}>
            <img src={symbol} />
          </div>
        </div>
      </div>
    </div>

    <div className="row my-3">
      <div className={"col"}>
        <div className={styles.banner} style={{height: "20rem"}}>
          How It Works
        </div>
      </div>
    </div>
  </>
)

export default Menu
