import Identicon from 'identicon.js';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCheersForUser } from '../../containers/main/actions';
import toast from '../../utils/alert';

const AccountProfile = (address) => {
  const data = new Identicon(address.address, 200).toString();
  return (
    <img
      width={30}
      height={30}
      src={`data:image/png;base64, ${data}`}
      className="rounded-full cursor-pointer"
      onClick={() => {
        navigator.clipboard.writeText(address.address);
        toast({ type: 'success', message: 'Copied to clipboard' });
      }}
    />
  );
};

const Details = ({
  address,
  contract,
  openModal,
  cheers,
  getCheersForUser,
}) => {
  useEffect(() => {
    const fetchCheers = async () => {
      await getCheersForUser(address, contract);
    };
    fetchCheers();
  }, [address]);

  const data = new Identicon(address, 200).toString();

  return (
    <div className="w-1/4">
      <div className="border py-8 rounded-xl">
        <div className="w-full text-center px-5">
          <img
            width={100}
            height={100}
            src={`data:image/png;base64, ${data}`}
            className="m-auto rounded-full"
          />
          <p
            className="mt-2"
            onClick={() => {
              navigator.clipboard.writeText(address);
              toast({ type: 'success', message: 'Copied to clipboard' });
            }}
          >
            {address.slice(0, 12)}...
          </p>
        </div>
        <div className="mt-8 mb-4 border border-r-0 border-l-0 p-2 text-center">
          <p className="font-semibold">Cheered Creators</p>
        </div>
        {cheers.length === 0 ? (
          <p className="px-5 font-light">
            You are not cheering anyone yet!{' '}
            <a href="/creators" className="text-blue-500 hover:underline">
              Find creators
            </a>
          </p>
        ) : (
          <div className="px-5">
            {cheers.map((account, index) => (
              <AccountProfile key={index} address={account} />
            ))}
          </div>
        )}

        <div className="mt-8 mb-4 border border-r-0 border-l-0 p-2 text-center">
          <p className="font-semibold">Subscriptions</p>
        </div>
        <p className="px-5 font-light">Whoops! No subscriptions found</p>
      </div>

      <div
        className="border p-3 rounded-xl mt-3 bg-blue-800 text-white cursor-pointer"
        onClick={openModal}
      >
        <p className="text-center">Upload Post</p>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  cheers: state.main.cheers,
});

const mapDispatchToProps = (dispatch) => ({
  getCheersForUser: (user, contract) =>
    dispatch(getCheersForUser(user, contract)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
