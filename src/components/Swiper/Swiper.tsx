import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Swiper.module.scss';
import cn from 'classnames/bind';

const cx = cn.bind(styles);

export default function SwiperContainer () {
    const slideData = [
        {
            id: 1,
            image: 'https://product-image.kurly.com/hdims/resize/%3E729x%3E652/quality/85/src/banner/main/mobile/img/43e37968-e708-43a9-83e5-271a3eae049c.png',
        },
        {
            id: 2,
            image: 'https://product-image.kurly.com/hdims/resize/%3E729x%3E652/quality/85/src/banner/main/mobile/img/43e37968-e708-43a9-83e5-271a3eae049c.png',
        },
        {
            id: 3,
            image: 'https://product-image.kurly.com/hdims/resize/%3E729x%3E652/quality/85/src/banner/main/mobile/img/43e37968-e708-43a9-83e5-271a3eae049c.png',
        },
        {
            id: 4,
            image: 'https://product-image.kurly.com/hdims/resize/%3E729x%3E652/quality/85/src/banner/main/mobile/img/43e37968-e708-43a9-83e5-271a3eae049c.png',
        },
        {
            id: 5,
            image: 'https://product-image.kurly.com/hdims/resize/%3E729x%3E652/quality/85/src/banner/main/mobile/img/43e37968-e708-43a9-83e5-271a3eae049c.png',
        }
    ];
    SwiperCore.use([Navigation, Scrollbar, Autoplay]);

    return(
        <div className={cx('swiper-container')}>
            <Swiper
                loop={true}
                spaceBetween={0}
                slidesPerView={1}
                navigation={false}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                className={cx('swiper')}
            >
                {slideData.map((slide) => (
                    <SwiperSlide key={slide.id} className={cx('swiper-slide')}>          
                        <div className={cx('image-wrapper')}>
                            <img 
                                src={slide.image} 
                                alt="slide" 
                                className={cx('slide-image')}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}


