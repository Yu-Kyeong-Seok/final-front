import { useState } from 'react';
import styles from './Modal.module.scss';
import cn from 'classnames/bind';

const cx = cn.bind(styles);

type ModalWrapProps = React.PropsWithChildren<{
    isOpen:boolean;
    onClose: () => void;
    onConfirm?: () => void;
}>;

export default function ModalWrap(props:ModalWrapProps) {
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
            {/* 모달 예시버튼 */}
            {/* <button onClick={openModal}>모달 열기</button> */}

            {isOpen && (
                <div className={cx('modalOverlay')} onClick={onClose}>
                    <div className={cx('modalContent')} onClick={(e) => e.stopPropagation()}>
                        {children}
                        <div className={cx('button-box')}>
                            <button className={cx('closeButton')} onClick={handleCancel}>취소</button>
                            <button className={cx('closeButton')} onClick={handleConfirm} >확인</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}