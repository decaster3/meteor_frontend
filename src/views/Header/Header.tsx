import React from "react"
import Icon from "react-fa"
import {css, cx} from "react-emotion"
import {
  Navbar,
  Container,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import {Link, NavLink as ReactRouterNavLink} from "react-router-dom"

import logo from "../../assets/logo.svg"
import {compose} from "redux"
import withGeolocation from "../../containers/Geolocation"
import {withUser} from "../../containers/UserSession"
import {UserInfo} from "../../containers/UserSession/actions"
import {Status, JS_HREF} from "../../constants"
import {UserState} from "../../containers/UserSession/constants"
import PhoneCallbackForm from "../PhoneCallback"
import SignUp from "../AuthWrapper"
import {styled, withTheme, ThemeProps, mediaBreakpointUp} from "../App/emotion"
import {City} from "../../containers/Geolocation/actions"
import CustomModal from "../CustomModal"

const Anchor = styled("a")`
  color: white;
  &:hover,
  &:focus {
    color: ${props => props.theme.orange};
    text-decoration: none;
    text-shadow: 0 0 3em ${props => props.theme.orange};
  }
`

const StyledNavLink = Anchor.withComponent(ReactRouterNavLink)

interface HeaderProps {
  citiesStatus: Status
  cities: City[]
  defaultCity: City
  userInfo: UserInfo
  userState: UserState
  setDefaultCity(city: City): void
}

interface HeaderState {
  isOpen: boolean
  modalShown: boolean
}

class Header extends React.Component<HeaderProps & ThemeProps, HeaderState> {
  static Logo = styled("img")`
    display: block;
    max-width: 100%;
    max-height: 2rem;
    margin: 0.25rem 0;
  `
  static CallMeBack = styled("button")`
    background-color: transparent;
    color: ${props => props.theme.lighterGrey};
    font-weight: 700;
    text-transform: uppercase;
    border: 2px solid ${props => props.theme.lighterGrey};
    border-radius: 4px;
    white-space: nowrap;
    line-height: 1.25;
    font-size: 12px;
    padding: 0 2px;
    ${mediaBreakpointUp("lg")} {
      padding: 0 8px;
      margin: 4px 8px;
      font-size: 16px;
      :hover,
      :focus {
        color: ${props => props.theme.lightestGrey};
        border-color: ${props => props.theme.lightestGrey};
      }
    }
  `
  static Phone = styled("div")`
    line-height: 1.25;
    color: ${props => props.theme.lighterGrey};
    font-weight: 700;
    white-space: nowrap;
    ${mediaBreakpointUp("lg")} {
      margin: 0.25rem 0.5rem;
    }
  `

  state: HeaderState = {
    isOpen: false,
    modalShown: false,
  }

  toggle = () => this.setState(prevState => ({isOpen: !prevState.isOpen}))

  toggleModal = () =>
    this.setState(prevState => ({modalShown: !prevState.modalShown}))

  handleCityClick = (city: City) => this.props.setDefaultCity(city)

  render() {
    return (
      <Navbar
        fixed="top"
        expand={"md"}
        dark={true}
        className={css`
          background: ${this.props.theme.darkBlue};
        `}
      >
        <Container>
          <div className="d-flex">
            <Link to="/" className="mr-3">
              <Header.Logo src={logo} />
            </Link>

            <div
              className={
                "d-none d-sm-flex flex-column align-items-center justify-content-center mr-3 flex-lg-row"
              }
            >
              <Header.Phone>{this.props.defaultCity.phone}</Header.Phone>

              <Header.CallMeBack onClick={this.toggleModal}>
                Перезвоните мне
              </Header.CallMeBack>

              <CustomModal
                centered={true}
                isOpen={this.state.modalShown}
                toggle={this.toggleModal}
              >
                <PhoneCallbackForm isLoading={false} />
              </CustomModal>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <div
              className={cx(
                "d-block d-md-none",
                css`
                  font-size: 1.5rem;
                  > a {
                    color: white;
                    :hover,
                    :focus {
                      color: ${this.props.theme.orange};
                      text-decoration: none;
                      text-shadow: 0 0 3em ${this.props.theme.orange};
                    }
                    & + a {
                      margin-left: 1rem;
                    }
                  }
                `
              )}
            >
              <Anchor className="d-inline d-sm-none" href={JS_HREF}>
                <Icon name="phone" />
              </Anchor>

              <StyledNavLink to="/cart">
                <Icon name="shopping-cart" />
              </StyledNavLink>

              <Anchor href={JS_HREF} onClick={this.toggle}>
                <Icon name="bars" />
              </Anchor>
            </div>
          </div>

          <Collapse isOpen={this.state.isOpen} navbar={true}>
            <Nav
              className={css`
                flex: 1;
                li {
                  text-transform: uppercase;
                  font-weight: 500;
                  white-space: nowrap;
                }
                /* To increase specificity to override Bootstrap styles */
                &&& a {
                  color: white;

                  &:hover,
                  &:focus,
                  &.active {
                    color: ${this.props.theme.orange};
                    text-decoration: none;
                    text-shadow: 0 0 3em ${this.props.theme.orange};
                  }
                }
                &&& button {
                  font-weight: 500;
                  text-transform: uppercase;
                  &:hover,
                  &:focus {
                    background: ${this.props.theme.lightestGrey};
                    outline: none;
                  }
                  &:active {
                    background: ${this.props.theme.lightBlue};
                  }
                }
                ${mediaBreakpointUp("lg")} {
                  justify-content: space-evenly;
                }
              `}
              navbar={true}
            >
              {this.props.citiesStatus === Status.LOADED &&
                this.props.cities.length > 0 &&
                (this.props.cities.length > 1 ? (
                  <UncontrolledDropdown nav={true} inNavbar={true}>
                    <DropdownToggle nav={true} caret={true}>
                      {this.props.citiesStatus === Status.LOADED
                        ? this.props.defaultCity.name
                        : "Город"}
                    </DropdownToggle>
                    <DropdownMenu right={true}>
                      {this.props.citiesStatus === Status.LOADED &&
                        this.props.cities.map(city => (
                          <DropdownItem
                            onClick={() => this.handleCityClick(city)}
                            key={city.id}
                          >
                            {city.name}
                          </DropdownItem>
                        ))}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                  <NavItem>
                    <NavLink>{this.props.cities[0].name}</NavLink>
                  </NavItem>
                ))}

              <NavItem>
                <NavLink tag={ReactRouterNavLink} to="/promotions">
                  Акции
                </NavLink>
              </NavItem>

              {this.props.userState === UserState.LOGED_IN ? (
                <NavItem>
                  <NavLink tag={ReactRouterNavLink} to="/account">
                    Аккаунт
                  </NavLink>
                </NavItem>
              ) : (
                <SignUp registrationFirst={false}>
                  <NavItem>
                    <NavLink href={JS_HREF} tag="a">
                      Вход
                    </NavLink>
                  </NavItem>
                </SignUp>
              )}

              <NavItem className="d-none d-md-block">
                <NavLink tag={ReactRouterNavLink} to="/cart">
                  Корзина
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default compose<any>(
  withUser,
  withGeolocation
)(withTheme(Header))
