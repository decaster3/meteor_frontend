import * as React from "react"
import Icon from "react-fa"
import * as classnames from "classnames"
import {Carousel} from "react-responsive-carousel"
import symbol from "./logo_meteor.png"

// @ts-ignore
import * as styles from "./Menu.module.scss"

const Menu = () => (
  <>
    <div className="row pt-3 mb-3">
      <div className="col-7">
        <div className={styles.banner} style={{height: "20rem"}}>
          <Carousel
            className={styles.carousel}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            autoPlay={true}
            stopOnHover={true}
            infiniteLoop={true}
          >
            <div className={styles.carousel}>
              <img src="http://via.placeholder.com/410x270" />
            </div>
            <div className={styles.carousel}>
              <img src="http://via.placeholder.com/410x270" />
            </div>
            <div className={styles.carousel}>
              <img src="http://via.placeholder.com/410x270" />
            </div>
          </Carousel>
        </div>
      </div>
      <div className="col-5">
        <div
          className={classnames(styles.banner, styles.registerBanner)}
          style={{height: "20rem"}}
        >
          <div className={styles.textBanner}>
            <button className={styles.registerButton}>
              Зарегестрироваться
            </button>
            <div style={{fontSize: "1rem"}}>и получи</div>
            <div className={styles.meteorsCount}>500</div>
            <div className={styles.meteor}>метеоров</div>
            <div style={{fontSize: "0.9rem", color: "#white"}}>
              чтобы обменять их на еду
            </div>
          </div>
          <div className={styles.imageBanner}>
            <img src={symbol} />
          </div>
        </div>
      </div>
    </div>

    <div className="row my-3">
      <div className="col">
        <div className={styles.banner} style={{height: "20rem"}}>
          How It Works
        </div>
      </div>
    </div>
  </>
)

export default Menu
