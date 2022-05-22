import { connect } from 'react-redux';
import LevelCard from './levelCard';

const Levels = ({ isOwn, levels, account, contract, oId, user }) => {
  if (levels.length === 0)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-xl font-light">No levels found</p>
      </div>
    );
  return (
    <div className={`w-full flex`}>
      {levels.map((level) => (
        <LevelCard
          level={level}
          isOwn={isOwn}
          contract={contract}
          account={account}
          oId={oId}
          myId={+user.id}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  levels: state.account.levels,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Levels);
