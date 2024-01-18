import React from 'react';
import './NoticationPopup.scss';
import moment from 'moment';
import {truncateString} from '../../helpers/utils/truncateString';

const NotificationPopup = ({
  firstName,
  city,
  country,
  productName,
  timestamp = `${new Date()}`,
  productImage,
  settings,
  close
}) => {
  const {hideTimeAgo, truncateProductName, position} = settings;

  return (
    <div className={`Avava-SP__Wrapper Avava-SP__Wrapper--${position}`}>
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            />
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div className={'Avada-SP__Subtitle'}>
                Purchased {truncateProductName ? truncateString(productName, 16) : productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                {hideTimeAgo ? '' : `${moment(timestamp).fromNow()}`}{' '}
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true" /> by Avada
                </span>
              </div>
            </div>
          </a>
          <div className="Avada-SP__Close" onClick={close}>
            <img
              src="https://boostsales.apps.avada.io/76c920a85ebd5fba8dd6568494f8021c.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
