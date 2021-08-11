import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './ModalDiscount.module.css';

const modalRoot = document.querySelector('#portal-root');

export default class ModalDiscount extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <div className={css.modal_backdrop} onClick={this.handleBackdropClick}>
        <div className={css.modal_content}>
          <button className={css.modal_close_btn} onClick={this.handleClose}>
            +
          </button>
          {children}
        </div>
      </div>,
      modalRoot
    );
  }
}

ModalDiscount.defaultProps = {
  children: null,
  className: null,
  onClose: null,
};

const { func, node, string } = PropTypes;

ModalDiscount.propTypes = {
  children: node,
  className: string,
  onClose: func.isRequired,
};
