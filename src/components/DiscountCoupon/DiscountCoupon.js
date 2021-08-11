import React, { Component } from 'react';
import { ModalDiscount, DiscountForm } from '../../components';
import { FormattedMessage } from '../../util/reactIntl';
import { getVoucher } from '../../util/api-voucherify';
import css from './DiscountCoupon.module.css';

export default class DiscountCoupon extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, code: '', error: null, voucher: false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { code } = this.state;

    if (prevState.code !== code) {
      if (code.length > 6) {
        this.feachVoucherify();
      }
    }
  }

  toggleModal = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
    this.setState({ voucher: false });
  };

  formSubmitQuery = value => {
    this.setState({ code: value });
  };

  feachVoucherify = () => {
    const { code } = this.state;

    getVoucher(code)
      .then(response => response.text())
      .then(result => {
        let obj = JSON.parse(result);
        console.log('obj>>', obj.code);

        console.log('Success>>', obj.code === code);
        if (obj.code === code) {
          this.setState({ voucher: true });
        }
      })
      .catch(error => {
        console.log(error);
        return [];
      });
  };

  render() {
    const { isOpen, voucher } = this.state;

    return (
      <div>
        <button className={css.enterDiscountCoupon} type="button" onClick={this.toggleModal}>
          <FormattedMessage id="DiscountCoupon.enterDiscountCoupon" />
        </button>

        {isOpen && (
          <ModalDiscount onClose={this.toggleModal}>
            <DiscountForm onSubmit={this.formSubmitQuery} voucher={voucher} />
          </ModalDiscount>
        )}
      </div>
    );
  }
}
