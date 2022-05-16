// HOC/withAuth.jsx
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== undefined) {
      const router = useRouter();
      const { account } = useWeb3React();

      // If there is no account we redirect to "/auth" page.
      if (!account) {
        router.replace('/auth');
        return null;
      }

      // If this is an account we just render the component that was passed with all its props
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
