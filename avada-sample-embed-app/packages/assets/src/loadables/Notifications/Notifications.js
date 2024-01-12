import Loadable from 'react-loadable';
import Loading from '@assets/components/Loading';

export default Loadable({
  loader: () => import('../../pages/Notification/Notifications'),
  loading: Loading
});
