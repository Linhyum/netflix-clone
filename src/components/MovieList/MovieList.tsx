import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import { Result } from '@/types/movieList.type'
import MovieItem from '../MovieItem/MovieItem'
interface Props {
   result: Result[]
   title: string
}
export default function MovieList({ result, title }: Props) {
   return (
      <div>
         <h2 className='text-3xl font-bold mb-3'>{title}</h2>
         <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={25}
            slidesPerView={4}
            navigation //Kích hoạt điều hướng (nút prev và next) cho slider.,
            breakpoints={{
               0: {
                  slidesPerView: 2,
                  spaceBetween: 12
               },
               640: {
                  slidesPerView: 3,
                  spaceBetween: 16
               },
               768: {
                  slidesPerView: 3,
                  spaceBetween: 16
               },
               1024: {
                  slidesPerView: 4,
                  spaceBetween: 16
               },
               1280: {
                  slidesPerView: 4,
                  spaceBetween: 25
               },
               1536: {
                  slidesPerView: 5,
                  spaceBetween: 25
               }
            }}
         >
            {result.map((item) => (
               <SwiperSlide key={item.id}>
                  <MovieItem item={item} />
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}
