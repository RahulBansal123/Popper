import { useRouter } from 'next/router';
import Main from '../containers/main';

function Home(props) {
  const router = useRouter();
  if (!props.account) {
    router.push('/auth');
  }
  return <Main account={props.account} contract={props.contract} />;
}
export default Home;
