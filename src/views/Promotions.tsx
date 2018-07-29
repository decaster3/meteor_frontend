import React from "react"
import {styled} from "./App/emotion"
import {PrimaryButton} from "./PrimaryButton"

const Image = styled("img")`
  width: 100%;
  margin-bottom: 16px;
`

const PromotionInfo = styled("p")`
  color: ${props => props.theme.lighterGrey};
  font-weight: 500;
  font-size: 18px;
  flex: 1;
`

const Promotions = () => (
  <div className="flex-grow-1 d-flex flex-column">
    <h1 className="mb-5">Акции</h1>

    <div className="flex-grow-1 row">
      <div className="col-12 col-md-6 mb-5 d-flex flex-column">
        <Image src="http://via.placeholder.com/640x360?text=Promotion+Image" />
        <h2>За словесными горами</h2>
        <PromotionInfo>
          Далеко-далеко за словесными горами в стране гласных и согласных живут
          рыбные тексты. Вдали от всех живут они в буквенных домах на берегу
          Семантика большого языкового океана.
        </PromotionInfo>
        <div className="d-flex justify-content-center">
          <PrimaryButton>Заказать</PrimaryButton>
        </div>
      </div>

      <div className="col-12 col-md-6 mb-5 d-flex flex-column">
        <Image src="http://via.placeholder.com/640x360?text=Promotion+Image" />
        <h2>Страдания юного Вертера</h2>
        <PromotionInfo>
          Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми
          необходимыми правилами. Эта парадигматическая страна, в которой
          жаренные члены предложения залетают прямо в рот.
        </PromotionInfo>
        <div className="d-flex justify-content-center">
          <PrimaryButton>Заказать</PrimaryButton>
        </div>
      </div>

      <div className="col-12 col-md-6 mb-5 d-flex flex-column">
        <Image src="http://via.placeholder.com/640x360?text=Promotion+Image" />
        <h2>Кафка</h2>
        <PromotionInfo>
          Даже всемогущая пунктуация не имеет власти над рыбными текстами,
          ведущими безорфографичный образ жизни.
        </PromotionInfo>
        <div className="d-flex justify-content-center">
          <PrimaryButton>Заказать</PrimaryButton>
        </div>
      </div>

      <div className="col-12 col-md-6 mb-5 d-flex flex-column">
        <Image src="http://via.placeholder.com/640x360?text=Promotion+Image" />
        <h2>За словесными горами</h2>
        <PromotionInfo>
          Далеко-далеко за словесными горами в стране гласных и согласных живут
          рыбные тексты. Вдали от всех живут они в буквенных домах на берегу
          Семантика большого языкового океана.
        </PromotionInfo>
        <div className="d-flex justify-content-center">
          <PrimaryButton>Заказать</PrimaryButton>
        </div>
      </div>

      <div className="col-12 col-md-6 mb-5 d-flex flex-column">
        <Image src="http://via.placeholder.com/640x360?text=Promotion+Image" />
        <h2>Страдания юного Вертера</h2>
        <PromotionInfo>
          Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми
          необходимыми правилами. Эта парадигматическая страна, в которой
          жаренные члены предложения залетают прямо в рот.
        </PromotionInfo>
        <div className="d-flex justify-content-center">
          <PrimaryButton>Заказать</PrimaryButton>
        </div>
      </div>

      <div className="col-12 col-md-6 mb-5 d-flex flex-column">
        <Image src="http://via.placeholder.com/640x360?text=Promotion+Image" />
        <h2>Кафка</h2>
        <PromotionInfo>
          Даже всемогущая пунктуация не имеет власти над рыбными текстами,
          ведущими безорфографичный образ жизни.
        </PromotionInfo>
        <div className="d-flex justify-content-center">
          <PrimaryButton>Заказать</PrimaryButton>
        </div>
      </div>
    </div>
  </div>
)

export default Promotions
