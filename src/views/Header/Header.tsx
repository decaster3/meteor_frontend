import * as React from "react"
import Icon from "react-fa"
import * as classnames from "classnames"
import {css, cx} from "react-emotion"
import {
  Col,
  Row,
  Navbar,
  Container,
  NavbarBrand,
  NavbarToggler,
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
import {City} from "../../containers/App/actions"
import {User} from "../../containers/UserSession/actions"
import {Status} from "../../constants"
import {UserState} from "../../containers/UserSession/constants"
import {
  styled,
  withTheme,
  ThemeProps,
  mediaBreakpointUp,
  JS_HREF,
} from "../App/Theme"

const StyledAnchor = styled("a")`
  color: white;

  &:hover,
  &:focus {
    color: ${props => props.theme.orange};
    text-decoration: none;
    text-shadow: 0 0 3em ${props => props.theme.orange};
  }
`

const StyledNavLink = StyledAnchor.withComponent(ReactRouterNavLink)

interface HeaderProps {
  citiesStatus: Status
  cities: City[]

  userInfoStatus: Status
  userInfo: User
  userState: UserState
}

interface HeaderState {
  isOpen: boolean
}

class Header extends React.Component<HeaderProps & ThemeProps, HeaderState> {
  constructor(props: HeaderProps & ThemeProps) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  toggle = () => this.setState(prevState => ({isOpen: !prevState.isOpen}))

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
          <div
            className={css`
              display: flex;
            `}
          >
            <Link
              to="/"
              className={css`
                margin-right: 1rem;
              `}
            >
              <img
                src={logo}
                className={css`
                  display: block;
                  max-width: 100%;
                  max-height: 2rem;
                  margin: 0.25rem 0;
                `}
              />
            </Link>

            <div
              className={cx(
                "d-none d-sm-flex",
                css`
                  display: flex;
                  flex-flow: column;
                  align-items: center;
                  justify-content: center;
                  margin-right: 1rem;

                  ${mediaBreakpointUp("lg")} {
                    flex-flow: row;
                  }
                `
              )}
            >
              <div
                className={css`
                  line-height: 1.25;
                  color: ${this.props.theme.lighterGrey};
                  font-weight: 700;
                  white-space: nowrap;

                  ${mediaBreakpointUp("lg")} {
                    margin: 0.25rem 0.5rem;
                  }
                `}
              >
                +7 727 321-22-21
              </div>
              <button
                className={css`
                  background-color: transparent;
                  color: ${this.props.theme.lighterGrey};
                  font-weight: 700;
                  text-transform: uppercase;
                  border: 2px solid ${this.props.theme.lighterGrey};
                  border-radius: 4px;
                  white-space: nowrap;
                  line-height: 1.25;
                  font-size: 12px;
                  padding: 0 2px;

                  ${mediaBreakpointUp("lg")} {
                    padding: 0 8px;
                    margin: 4px 8px;
                    font-size: 16px;

                    &:hover,
                    &:focus {
                      color: ${this.props.theme.lightestGrey};
                      border-color: ${this.props.theme.lightestGrey};
                    }
                  }
                `}
              >
                <Icon name="phone" /> Позвоните мне
              </button>
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

                    &:hover,
                    &:focus {
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
              {/* <GlowingLightLink href="#">
                <Icon name="phone" />
              </GlowingLightLink> */}

              <StyledAnchor className="d-inline d-sm-none" href={JS_HREF}>
                <Icon name="phone" />
              </StyledAnchor>

              <StyledNavLink to="/cart">
                <Icon name="shopping-cart" />
              </StyledNavLink>

              <StyledAnchor href={JS_HREF} onClick={this.toggle}>
                <Icon name="bars" />
              </StyledAnchor>
            </div>

            {/* <StyledNavbarToggler  /> */}
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
              <NavItem className="d-none d-md-block">
                <NavLink tag={ReactRouterNavLink} to="/cart">
                  Корзина
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={ReactRouterNavLink} to="/account">
                  Аккаунт
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={ReactRouterNavLink} to="/sales">
                  Акции
                </NavLink>
              </NavItem>

              {this.props.citiesStatus === Status.LOADED &&
                this.props.cities.length > 0 &&
                (this.props.cities.length > 1 ? (
                  <UncontrolledDropdown nav={true} inNavbar={true}>
                    <DropdownToggle nav={true} caret={true}>
                      {this.props.citiesStatus === Status.LOADED
                        ? this.props.cities[0].name
                        : "Город"}
                    </DropdownToggle>
                    <DropdownMenu right={true}>
                      {this.props.citiesStatus === Status.LOADED &&
                        this.props.cities.map(city => (
                          <DropdownItem key={city.id}>{city.name}</DropdownItem>
                        ))}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                  <NavItem>
                    <NavLink>{this.props.cities[0].name}</NavLink>
                  </NavItem>
                ))}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default withTheme(Header)
