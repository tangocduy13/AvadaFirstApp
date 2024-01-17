import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';
import {sleep} from '../helpers/utils/sleep';

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

    if (
      (allowShow === 'all' && !excludedUrlsList.has(currentUrl)) ||
      (allowShow === 'specific' && includedUrlsList.has(currentUrl))
    ) {
      return true;
    }
    return false;
  }

  async displayNotification() {
    const {displayDuration, maxPopsDisplay, firstDelay, popsInterval} = this.settings;
    const popDisplayArray = Array.from({length: maxPopsDisplay}, (_, index) => index).slice(
      0,
      maxPopsDisplay
    );

    await sleep(firstDelay);
    for (const popIndex of popDisplayArray) {
      this.display({notification: this.notifications[popIndex], settings: this.settings});
      await sleep(displayDuration);
      this.fadeOut();
      await sleep(popsInterval);
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
