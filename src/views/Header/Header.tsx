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
  jsHref,
} from "../App/Theme"

const StyledLink = styled("a")`
  color: white;

  &:hover,
  &:focus {
    color: ${props => props.theme.orange};
    text-decoration: none;
    text-shadow: 0 0 3em ${props => props.theme.orange};
  }
`

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
        expand="lg"
        dark={true}
        className={css`
          background: ${this.props.theme.darkBlue};
        `}
      >
        <Container>
          <div
            className={css`
              display: flex;
              align-items: center;
              padding-right: 1rem;
            `}
          >
            <a href="/">
              <img
                src={logo}
                className={css`
                  display: block;
                  max-width: 100%;
                  max-height: 2rem;
                  margin: 0.25rem 0;
                `}
              />
            </a>
          </div>

          <div
            className={cx(
              "d-none d-lg-flex",
              css`
                display: flex;
                align-items: center;
                justify-content: center;
              `
            )}
          >
            <div
              className={css`
                color: ${this.props.theme.lighterGrey};
                font-weight: 700;
                white-space: nowrap;
                margin: 0.25rem 0.5rem;
              `}
            >
              +7 727 321-22-21
            </div>
            <button
              className={css`
                background-color: transparent;
                border: 0.125rem solid ${this.props.theme.lighterGrey};
                color: ${this.props.theme.lighterGrey};
                font-weight: 700;
                padding: 0 0.75rem;
                border-radius: 0.25rem;
                text-transform: uppercase;
                margin: 0.25rem 0.5rem;

                &:hover,
                &:focus {
                  color: ${this.props.theme.lightestGrey};
                  border-color: ${this.props.theme.lightestGrey};
                }
              `}
            >
              <Icon name="phone" /> Позвоните мне
            </button>
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <div
              className={cx(
                "d-block d-lg-none",
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

              <StyledLink href="#">
                <Icon name="phone" />
              </StyledLink>

              <StyledLink href="#">
                <Icon name="shopping-cart" />
              </StyledLink>

              <StyledLink href={jsHref} onClick={this.toggle}>
                <Icon name="bars" />
              </StyledLink>
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
                }

                /* To increase specificity to override Bootstrap styles */
                &&& a {
                  color: white;

                  &:hover,
                  &:focus {
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

                  &&& a {
                  }
                }
              `}
              navbar={true}
            >
              <NavItem>
                <NavLink href="#">Аккаунт</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="#">Акции</NavLink>
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
