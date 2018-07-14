import * as React from "react"
import {Modal} from "reactstrap"

import * as styles from "./ModalWrapper.module.scss"

interface ModalState {
  modalShown: boolean
}
interface ModalProps {
  children?: React.ReactNode
  modalTitle: string
  onCloseListener?: boolean
  modalToggler: React.ComponentType
}

class ModalWrapper extends React.Component<ModalProps, ModalState> {
  static getDerivedStateFromProps(
    nextProps: ModalProps,
    prevState: ModalState
  ) {
    if (nextProps.onCloseListener === true && prevState.modalShown === true) {
      return {modalShown: false}
    }
    return null
  }

  state: ModalState = {
    modalShown: false,
  }

  toggleModal = () => {
    this.setState(prevState => ({modalShown: !prevState.modalShown}))
  }

  render() {
    const ModalToggler = this.props.modalToggler
    return (
      <>
        <div onClick={this.toggleModal}>
          <ModalToggler />
        </div>
        <Modal
          centered={true}
          isOpen={this.state.modalShown}
          toggle={this.toggleModal}
          contentClassName={styles.modalContent}
        >
          <div className={styles.modalTitle}>
            <h4 className="text-center m-3">{this.props.modalTitle}</h4>
          </div>
          {this.props.children}
        </Modal>
      </>
    )
  }
}

export default ModalWrapper
