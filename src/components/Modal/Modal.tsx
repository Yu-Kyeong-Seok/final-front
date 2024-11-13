import { useState } from 'react';
import styles from './Modal.module.scss';
import cn from 'classnames/bind';

const cx = cn.bind(styles);

type ModalWrapProps = {
    onCancel?: (...args: any) => void;
    onConfirm?: (...args: any) => void;
}

export default function ModalWrap(props:ModalWrapProps) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleCancel = () => {
        props.onCancel?.();
        closeModal();
    }
    const handleConfirm = () => {
        props.onConfirm?.();
        closeModal();
    }
    
    return(
        <div>
            <button onClick={openModal}>모달 열기</button>

            {isOpen && (
                <div className={cx('modalOverlay')} onClick={closeModal}>
                <div className={cx('modalContent')} onClick={(e) => e.stopPropagation()}>
                    <h2>여기에 텍스트를 입력해주세요</h2>
                    <p>모달 내용을 여기에 작성하세요.</p>
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