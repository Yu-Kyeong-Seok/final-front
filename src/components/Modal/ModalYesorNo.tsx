import { useState } from 'react';
import styles from './ModalYesorNo.module.scss';
import cn from 'classnames/bind';

const cx = cn.bind(styles);

type ModalYesorNoWrapProps = React.PropsWithChildren<{
    isOpen:boolean;
    onClose: () => void;
    onConfirm?: (() => void) | null;
}>;

export default function ModalYesorNoWrap(props:ModalYesorNoWrapProps) {
    const {children, isOpen, onClose, onConfirm} = props;

    const handleCancel = () => {
        onClose();
    }
    
    const handleConfirm = () => {
        onConfirm?.();
        onClose();
    }

    if (!isOpen) return null;
    
    return(
        <div>
            {isOpen && (
                <div className={cx('modalOverlay')} onClick={onClose}>
                    <div className={cx('modalContent')} onClick={(e) => e.stopPropagation()}>
                        {children}
                        <div className={cx('button-box')}>
                            <button className={cx('closeButton')} onClick={handleCancel}>취소</button>
                            <button className={cx('confirmButton')} onClick={handleConfirm}>확인</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}