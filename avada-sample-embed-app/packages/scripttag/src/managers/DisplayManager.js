import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';
import {delay} from '../helpers/utils/delay';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }

  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;

    if (!this.checkUrls()) return;

    await this.insertContainer();
    await this.displayNotification();
  }

  checkUrls() {
    const {allowShow, includedUrls, excludedUrls} = this.settings;

    const includedUrlsList = new Set(includedUrls.split('\n'));
    const excludedUrlsList = new Set(excludedUrls.split('\n'));
    const currentUrl = window.location.href;

    switch (allowShow) {
      case 'all': {
        return !excludedUrlsList.has(currentUrl);
      }
      case 'specific': {
        return includedUrlsList.has(currentUrl) && !excludedUrlsList.has(currentUrl);
      }
    }
  }

  async displayNotification() {
    const {displayDuration, maxPopsDisplay, firstDelay, popsInterval} = this.settings;
    const popDisplayArray = Array.from({length: maxPopsDisplay}, (_, index) => index).slice(
      0,
      maxPopsDisplay
    );

    await delay(firstDelay);
    for (const popIndex of popDisplayArray) {
      this.display({notification: this.notifications[popIndex], settings: this.settings});
      await delay(displayDuration);
      this.fadeOut();
      await delay(popsInterval);
    }
  }

  close() {
    const container = document.querySelector('#Avada-SalePop');
    container.remove();
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.style.display = 'none';
  }

  display({notification, settings}) {
    const container = document.querySelector('#Avada-SalePop');
    container.style.display = 'block';
    render(
      <NotificationPopup {...notification} settings={settings} close={this.close} />,
      container
    );
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }
    return popupEl;
  }
}
