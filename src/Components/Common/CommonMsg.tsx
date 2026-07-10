import { Modal } from 'antd';
import { notifier } from '../../Attributes/Notification';
import type { DeleteConfirmOptions } from '../../Types';

export const showDeleteConfirm = ({
  title = 'Delete Item',
  content = 'Are you sure you want to delete this item? This action cannot be undone.',
  onConfirm,
  onCancel,
}: DeleteConfirmOptions) => {
  Modal.confirm({
    title: title,
    content: content,
    okText: 'Yes, Delete',
    okType: 'danger',
    cancelText: 'Cancel',
    onOk() {
      onConfirm();
    },
    onCancel() {
      if (onCancel) {
        onCancel();
      }
    },
  });
};


export const handleCommonDeleteAction = (itemName: string, onConfirm: () => void) => {
  showDeleteConfirm({
    title: `Delete ${itemName}`,
    content: `Are you sure you want to delete this ${itemName.toLowerCase()}? This cannot be undone.`,
    onConfirm,
  });
};

export const showActionSuccess = (itemName: string, action: 'created' | 'updated' | 'deleted' | 'saved') => {
  notifier.success(`${itemName} ${action} successfully.`);
};
