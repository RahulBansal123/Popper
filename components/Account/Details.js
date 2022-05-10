import Identicon from 'identicon.js';
import toast from '../../utils/alert';

const Details = ({ address, openModal }) => {
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
        <p className="px-5 font-light">
          You are not cheering anyone yet!{' '}
          <a href="/creators" className="text-blue-500 hover:underline">
            Find creators
          </a>
        </p>

        <div className="mt-8 mb-4 border border-r-0 border-l-0 p-2 text-center">
          <p className="font-semibold">Subscriptions</p>
        </div>
        <p className="px-5 font-light">Whoops! No subscriptions found</p>
      </div>

      <div
        className="border p-3 rounded-xl mt-3 bg-blue-800 text-white cursor-pointer"
        onClick={openModal}
      >
        <p className="text-center">Upload Image</p>
      </div>
    </div>
  );
};

export default Details;
