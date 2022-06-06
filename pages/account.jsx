import AccountContainer from '../containers/account';

const Account = (props) => {
  return <AccountContainer contract={props.contract} account={props.account} />;
};

export default Account;
