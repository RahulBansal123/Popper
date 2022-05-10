import Identicon from 'identicon.js';
import toast from '../../utils/alert';

const Details = ({ address }) => {
  const data = new Identicon(address, 200).toString();
  return (
    <div className="w-1/4 border py-3 px-5 rounded-xl">
      <div className="w-full text-center">
        <img
          width={100}
          height={100}
          src={`data:image/png;base64, ${data}`}
          className="m-auto"
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
    </div>
  );
};

export default Details;
