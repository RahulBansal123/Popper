import { useState } from 'react';
import CornerRibbon from 'react-corner-ribbon';
import web3 from 'web3';
import { EditLevel } from '../EditLevel';
import toast from '../../utils/alert';

const LevelCard = ({ main, level, isOwn, account, contract, oId, myId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const buySubscription = async () => {
    try {
      const res = await contract.methods.subscribe(oId, myId, level.name).send({
        from: account,
        gasLimit: 6021975,
      });
      console.log(res);
      toast({
        type: 'success',
        message: 'Subscribed',
      });
    } catch (err) {
      toast({
        type: 'error',
        message: err.message,
      });
    }
  };

  return (
    <div className="flex col-span-1 mx-auto">
      <EditLevel
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        contract={contract}
        account={account}
        isEditMode={true}
        level={level}
      />
      <div
        className={`relative flex flex-col max-w-sm border p-5 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer ${
          main ? 'bg-blue-800 text-white' : 'bg-white'
        }`}
      >
        <CornerRibbon
          position="top-right"
          fontColor="#f0f0f0"
          backgroundColor="#2c7"
          className="font-bold"
        >
          {level.name}
        </CornerRibbon>
        <div className="px-6 py-4">
          <div className="font-bold text-2xl mb-2">{level.title}</div>
          <p className={`${main ? 'text-white' : 'text-gray-700'} text-base`}>
            {level.description}
          </p>
        </div>
        <div className="px-6 flex-1">
          {level.features?.map((item) => (
            <div className="flex items-center my-2" key={item}>
              <img
                src="/assets/images/popper.png"
                alt="popper"
                width={25}
                height={25}
              />
              <p
                className={`text-base mx-2 ${
                  main ? 'text-white' : 'text-gray-600'
                }`}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <button
            className={`w-full btn ${
              main
                ? 'bg-white text-blue-800 hover:text-[#004c81e6]'
                : 'bg-blue-800 text-white hover:bg-[#004c81e6]'
            } !px-5 !rounded-3xl shadow-md`}
            onClick={() => {
              if (isOwn) setIsOpen(true);
              else buySubscription();
            }}
          >
            {isOwn ? 'Edit' : 'Buy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelCard;
