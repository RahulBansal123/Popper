import Identicon from 'identicon.js';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next//router';

import { getCheersForUser } from '../../containers/main/actions';
import toast from '../../utils/alert';

const AccountProfile = (address) => {
  const router = useRouter();
  const data = new Identicon(
    address.address || '0x0000000000000000',
    200
  ).toString();
  return (
    <img
      width={30}
      height={30}
      src={`data:image/png;base64, ${data}`}
      className="rounded-full cursor-pointer mx-1"
      onClick={() => {
        router.push({
          pathname: '/account',
          query: { address: address.address },
        });
      }}
    />
  );
};

const Details = ({
  myAccount,
  address,
  contract,
  openModal,
  cheers,
  getCheersForUser,
  showLevelAdd = false,
  openLevelModal,
}) => {
  useEffect(() => {
    const fetchCheers = async () => {
      if (contract) await getCheersForUser(address, contract);
    };
    fetchCheers();
  }, [address, contract]);

  const data = new Identicon(address || '0x0000000000000000', 200).toString();

  return (
    <div className="w-10/12 md:w-1/4 mx-auto mb-10 md:my-0">
      <div className="border py-8 rounded-xl">
        <div className="w-full text-center px-5">
          <img
            width={100}
            height={100}
            src={`data:image/png;base64, ${data}`}
            className="m-auto rounded-full"
          />
          <p
            className="mt-2 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(address);
              toast({ type: 'success', message: 'Copied to clipboard' });
            }}
          >
            {address?.slice(0, 12)}...
          </p>
        </div>
        <div className="mt-8 mb-4 border border-r-0 border-l-0 p-2 text-center">
          <p className="font-semibold">Cheered Creators</p>
        </div>
        {cheers.length === 0 ? (
          <p className="px-5 font-light">You are not cheering anyone yet! </p>
        ) : (
          <div className="px-5 flex">
            {cheers.map((account, index) => (
              <AccountProfile key={index} address={account} />
            ))}
          </div>
        )}
      </div>

      {showLevelAdd && myAccount === address && (
        <div
          className="border p-3 rounded-xl mt-3 bg-blue-800 text-white cursor-pointer hover:bg-[#004c81e8]"
          onClick={openLevelModal}
        >
          <p className="text-center">Add Level</p>
        </div>
      )}

      {myAccount === address && (
        <div
          className="border p-3 rounded-xl mt-3 bg-blue-800 text-white hover:bg-[#004c81e8] cursor-pointer"
          onClick={openModal}
        >
          <p className="text-center">Upload Post</p>
        </div>
      )}
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
