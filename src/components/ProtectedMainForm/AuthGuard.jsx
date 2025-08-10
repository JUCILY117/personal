import { Navigate } from 'react-router-dom';
import useEasterEgg from '../../../utils/useEasterEgg';

export default function AuthGuard({ children }) {
  const { unlocked } = useEasterEgg();
  if (!unlocked) {
    return <Navigate to="/404" replace />;
  }
  return children;
}
