import CornerRibbon from 'react-corner-ribbon';

const Levels = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 space-x-4">
      <LevelCard level="beginner" />
      <LevelCard main level="premium" />
      <LevelCard level="diamond" />
    </div>
  );
};

const LevelCard = ({ main, level }) => (
  <div className="flex col-span-1">
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
        {level}
      </CornerRibbon>
      <div className="px-6 py-4">
        <div className="font-bold text-2xl mb-2">The Coldest Sunset</div>
        <p className={`${main ? 'text-white' : 'text-gray-700'} text-base`}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
      <div className="px-6 flex-1">
        {[0, 1, 2, 3, 4].map((item) => (
          <div className="flex items-center my-2">
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
              Great to learn
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
        >
          Buy
        </button>
      </div>
    </div>
  </div>
);

export default Levels;
