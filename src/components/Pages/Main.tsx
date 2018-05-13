import * as React from "react"
import styled from "styled-components"
import bg from "./pattern_1.svg"

// @ts-ignore
import styles from "./Main.module.css"

console.log("styles", styles)

enum Color {
  DarkBlue = "hsl(230, 60%, 5%)",
  Blue = "hsl(226, 54%, 13%)",
  Orange = "hsl(33, 99%, 50%)",
  DarkGrey = "hsl(199, 20%, 15.5%)",
  Grey = "hsl(200, 23%, 23.5%)",
  LightGrey = "hsl(199, 28%, 31.5%)",
}

const StyledContainerWrapper = styled.div`
  background-image: url(${bg});
`

const StyledBottomNavbar = styled.div`
  display: flex;
  background-color: ${Color.Orange};
  justify-content: space-evenly;
  align-items: center;
  height: 5rem;
  text-transform: uppercase;
  font-weight: 700;
  color: hsl(230, 60%, 5%, 0);
  letter-spacing: 0.125rem;

  > .separator {
    height: 3rem;
    width: 0.125rem;
    background-color: ${Color.DarkBlue};
  }
`

const StyledTopNavbar = styled.div`
  display: flex;
  background-color: ${Color.DarkBlue};
  justify-content: space-evenly;
  align-items: center;
  height: 5rem;
  text-transform: uppercase;
  font-weight: 700;
  color: white;
  letter-spacing: 0.125rem;

  > .separator {
    height: 3rem;
    width: 0.125rem;
    background-color: ${Color.DarkGrey};
  }
`

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  > .separator {
    width: 0.25rem;
    height: 11rem;
    background-color: ${Color.Grey};
  }
`

const StyledMenu = styled.div`
  padding: 0.5rem 2rem;
  text-transform: uppercase;
  color: white;
  letter-spacing: 0.125rem;
  font-weight: 500;

  > div {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
`

const StyledSecondaryMenu = styled.div`
  padding: 0.5rem 2rem;
  color: white;
  letter-spacing: 0.125rem;
  font-weight: 500;

  > div {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
`

const StyledLightLink = styled.a`
  color: white;

  &:hover,
  &:focus {
    color: ${Color.Orange};
    text-decoration: none;
  }
`

const StyledDarkLink = styled.a`
  color: ${Color.DarkBlue};

  &:hover,
  &:focus {
    color: white;
    text-decoration: none;
  }
`

const StyledBanner = styled.div`
  color: ${Color.LightGrey};
  border: 0.25rem solid ${Color.LightGrey};
  text-transform: uppercase;
  letter-spacing: 0.125em;
  font-size: 2rem;
  margin: 1rem;
  padding: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const pages = ["City", "Menu", "Sales", "Profile", "Cart"]

const secondaryPages = [
  "Delivery & Payment",
  "Sales & Offers",
  "Feedback",
  "About",
]

const categories = [
  "Pizza",
  "Sushi",
  "Burgers",
  "Salads",
  "Beverages",
  "Desserts",
]

const Main = () => (
  <StyledContainerWrapper className={styles["container-wrapper"]}>
    <div className={styles.backdrop}>
      <div className={`container ${styles.container}`}>
        <StyledTopNavbar className="row">
          {pages.map((page, index) => (
            <React.Fragment key={index}>
              {index > 0 && <div className="separator" />}
              <div>
                <StyledLightLink href="#">{page}</StyledLightLink>
              </div>
            </React.Fragment>
          ))}
        </StyledTopNavbar>

        <div className="row my-3">
          <div className="col-4">
            <StyledBanner style={{height: "20rem"}}>Ad Banner</StyledBanner>
          </div>
          <div className="col-8">
            <StyledBanner style={{height: "20rem"}}>Image</StyledBanner>
          </div>
        </div>

        <div className="row my-3">
          <div className="col">
            <StyledBanner style={{height: "10rem"}}>How It Works</StyledBanner>
          </div>
        </div>

        <StyledBottomNavbar className="row">
          {categories.map((category, index) => (
            <React.Fragment key={index}>
              {index > 0 && <div className="separator" />}
              <div>
                <StyledDarkLink href="#">{category}</StyledDarkLink>
              </div>
            </React.Fragment>
          ))}
        </StyledBottomNavbar>

        <StyledFooter className="row py-4 d-flex align-items-center">
          <StyledMenu>
            {categories.map(
              (category, index) =>
                index < categories.length / 2 && (
                  <div key={index}>
                    <StyledLightLink href="#">{category}</StyledLightLink>
                  </div>
                )
            )}
          </StyledMenu>

          <div className="separator" />

          <StyledMenu>
            {categories.map(
              (category, index) =>
                index >= categories.length / 2 && (
                  <div key={index}>
                    <StyledLightLink href="#">{category}</StyledLightLink>
                  </div>
                )
            )}
          </StyledMenu>

          <div className="separator" />

          <StyledSecondaryMenu>
            {secondaryPages.map((secondaryPage, index) => (
              <div key={index}>
                <StyledLightLink href="#">{secondaryPage}</StyledLightLink>
              </div>
            ))}
          </StyledSecondaryMenu>
        </StyledFooter>
      </div>
    </div>
  </StyledContainerWrapper>
)

export default Main
