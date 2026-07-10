import { message, notification } from 'antd';
import { SUCCESS_MESSAGES, ERROR_MESSAGES, WARNING_MESSAGES, INFO_MESSAGES } from '../../Constants/messages';
import type { SuccessPresetKey, ErrorPresetKey, WarningPresetKey, InfoPresetKey, NotificationOptions } from '../../Types';

const isSuccessKey = (val: string): val is SuccessPresetKey => val in SUCCESS_MESSAGES;
const isErrorKey = (val: string): val is ErrorPresetKey => val in ERROR_MESSAGES;
const isWarningKey = (val: string): val is WarningPresetKey => val in WARNING_MESSAGES;
const isInfoKey = (val: string): val is InfoPresetKey => val in INFO_MESSAGES;

export const notifier = {
  success: ( keyOrMessage: SuccessPresetKey | string, description?: string, options?: NotificationOptions ) => {
    const msg = isSuccessKey(keyOrMessage) ? SUCCESS_MESSAGES[keyOrMessage] : keyOrMessage;
    const msgKey = options?.key ?? String(msg);
    if (description) { 
      notification.success({
        message: msg,
        description,
        duration: options?.duration ?? 4.5,
        placement: options?.placement ?? 'topRight',
        key: msgKey,
        onClick: options?.onClick,
        onClose: options?.onClose,
      });
    } else {
      message.success({
        content: msg,
        duration: options?.duration ?? 3,
        key: msgKey,
        onClose: options?.onClose,
      });
    }
  },

  error: (
    keyOrMessage: ErrorPresetKey | string,
    description?: string,
    options?: NotificationOptions
  ) => {
    const msg = isErrorKey(keyOrMessage) ? ERROR_MESSAGES[keyOrMessage] : keyOrMessage;
    const msgKey = options?.key ?? String(msg);
    if (description) {
      notification.error({
        message: msg,
        description,
        duration: options?.duration ?? 5,
        placement: options?.placement ?? 'topRight',
        key: msgKey,
        onClick: options?.onClick,
        onClose: options?.onClose,
      });
    } else {
      message.error({
        content: msg,
        duration: options?.duration ?? 4,
        key: msgKey,
        onClose: options?.onClose,
      });
    }
  },

  warning: (
    keyOrMessage: WarningPresetKey | string,
    description?: string,
    options?: NotificationOptions
  ) => {
    const msg = isWarningKey(keyOrMessage) ? WARNING_MESSAGES[keyOrMessage] : keyOrMessage;
    const msgKey = options?.key ?? String(msg);
    if (description) {
      notification.warning({
        message: msg,
        description,
        duration: options?.duration ?? 4.5,
        placement: options?.placement ?? 'topRight',
        key: msgKey,
        onClick: options?.onClick,
        onClose: options?.onClose,
      });
    } else {
      message.warning({
        content: msg,
        duration: options?.duration ?? 3.5,
        key: msgKey,
        onClose: options?.onClose,
      });
    }
  },

  info: (
    keyOrMessage: InfoPresetKey | string,
    description?: string,
    options?: NotificationOptions
  ) => {
    const msg = isInfoKey(keyOrMessage) ? INFO_MESSAGES[keyOrMessage] : keyOrMessage;
    const msgKey = options?.key ?? String(msg);
    if (description) {
      notification.info({
        message: msg,
        description,
        duration: options?.duration ?? 4.5,
        placement: options?.placement ?? 'topRight',
        key: msgKey,
        onClick: options?.onClick,
        onClose: options?.onClose,
      });
    } else {
      message.info({
        content: msg,
        duration: options?.duration ?? 3,
        key: msgKey,
        onClose: options?.onClose,
      });
    }
  },
};
export type { SuccessPresetKey, ErrorPresetKey, WarningPresetKey, InfoPresetKey, NotificationOptions };
