import React, { Component } from 'react';
import css from './DiscountForm.module.css';
import { Button } from '..';

export default class DiscountForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', message: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    // transfer of props in DiscountCoupon
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    const availableBtn = this.state.value.length > 6;
    const { voucher } = this.props;

    return (
      <div>
        <h1 className={css.discount_title}>Discount coupon</h1>
        <form className={css.form_field} onSubmit={this.handleSubmit}>
          <input
            className={css.form_input}
            type="text"
            name="name"
            placeholder=" "
            value={this.state.value}
            onChange={this.handleChange}
          />
          <label className={css.form_lable}>Enter a coupon code</label>

          {voucher && (
            <div className={css.msg_coupon}>
              Congratulations! You have availed a $10 discount coupon!
            </div>
          )}

          {availableBtn ? (
            <Button className={css.btn_submit} type="submit">
              Apply
            </Button>
          ) : (
            <div className={css.btn_disable}>Apply</div>
          )}
        </form>
      </div>
    );
  }
}
