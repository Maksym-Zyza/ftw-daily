import PropTypes from 'prop-types';

const myHeaders = new Headers();
myHeaders.append('X-App-Id', 'a319c47d-cdff-4344-9b53-757d3de8d44c');
myHeaders.append('X-App-Token', 'ef0f06eb-3ff5-4b58-b018-b677c1b21142');
myHeaders.append('Content-Type', 'application/json');

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

export const getVoucher = async function(code) {
  try {
    const response = await fetch(`https://api.voucherify.io/v1/vouchers/${code}`, requestOptions);
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// getSerchMovies.propTypes = {
//   code: PropTypes.code.isRequired,
// };
