import { sendMessageToParent } from '../internal/communication';
import { ensureInitialized } from '../internal/internalAPIs';
import { FrameContexts } from '../public/constants';
import { runtime } from '../public/runtime';
import { ShowNotificationParameters } from './interfaces';

export namespace notifications {
  /**
   * @privateRemarks
   * Hide from docs.
   * ------
   * display notification API.
   *
   * @param message - Notification message.
   * @param notificationType - Notification type
   *
   * @internal
   */
  export function showNotification(showNotificationParameters: ShowNotificationParameters): void {
    ensureInitialized(FrameContexts.content);
    sendMessageToParent('notifications.showNotification', [showNotificationParameters]);
  }
  export function isSupported(): boolean {
    return runtime.supports.notifications ? true : false;
  }
}