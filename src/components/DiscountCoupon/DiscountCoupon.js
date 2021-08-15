import React, { Component } from 'react';
import { ModalDiscount, DiscountForm } from '../../components';
import { FormattedMessage } from '../../util/reactIntl';
import { getVoucher } from '../../util/api-voucherify';
import css from './DiscountCoupon.module.css';

export default class DiscountCoupon extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, code: '', error: null, voucher: false, del: false };
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
    const { code, voucher } = this.state;
    const { price } = this.props;

    getVoucher(code)
      .then(response => response.text())
      .then(result => {
        let obj = JSON.parse(result);
        console.log('obj>>', obj);

        if (obj.code === code) {
          this.setState({ voucher: true, del: true });
          console.log('voucher>>', obj.code === code);
          console.log(
            'Total price:',
            (price[0].lineTotal.amount / 100 - (price[0].lineTotal.amount / 100) * 0.1).toFixed(2),
            '$'
          );
        }
      })
      .catch(error => {
        console.log(error);
        return [];
      });
    this.setState({ code: '' });
  };

  handleDelVoucher = () => {
    const { voucher } = this.state;
    const { price } = this.props;

    this.setState({ voucher: false, del: false });
    console.log('voucher', voucher);
    price === 0
      ? null
      : console.log('Total price:', (price[0].lineTotal.amount / 100).toFixed(2), '$');
  };

  render() {
    const { isOpen, voucher, del } = this.state;
    // console.log('del', del);

    return (
      <div>
        {del ? (
          <button className={css.enterDiscountCoupon} type="button" onClick={this.handleDelVoucher}>
            <FormattedMessage id="DiscountCoupon.deleteDiscountCoupon" />
          </button>
        ) : (
          <button className={css.enterDiscountCoupon} type="button" onClick={this.toggleModal}>
            <FormattedMessage id="DiscountCoupon.enterDiscountCoupon" />
          </button>
        )}

        {isOpen && (
          <ModalDiscount onClose={this.toggleModal}>
            <DiscountForm onSubmit={this.formSubmitQuery} voucher={voucher} />
          </ModalDiscount>
        )}
      </div>
    );
  }
}
