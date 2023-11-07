'use client'
import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import Link from 'next/link'
import { getImg } from '@/utils/utils'
import { Result } from '@/types/movieList.type'

export default function HomeBanner({ popular }: { popular: Result[] }) {
   return (
      <Swiper
         modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
         spaceBetween={0}
         slidesPerView={1}
         navigation //Kích hoạt điều hướng (nút prev và next) cho slider.
         autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }} //Kích hoạt chế độ tự động chuyển slide. Trong trường hợp này, mỗi slide sẽ tự động chuyển sau 1 giây và sẽ không tắt khi người dùng tương tác với slider.
      >
         {popular.map((item) => (
            <SwiperSlide key={item.id}>
               <div
                  className='h-screen bg-center bg-cover relative bg-no-repeat'
                  style={{
                     backgroundImage: `url(${getImg(item.backdrop_path)})`
                  }}
               >
                  <div className='absolute inset-0 bg-black/60'></div>
                  <div className='container flex items-center justify-between absolute inset-0'>
                     <div className='flex flex-col gap-y-3 w-full md:w-1/2'>
                        <h2 className='text-3xl font-bold'>{item.title}</h2>
                        <div className='flex items-center gap-x-5 text-base'>
                           <div className='flex items-center gap-x-1'>
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 fill='none'
                                 viewBox='0 0 24 24'
                                 strokeWidth={1.5}
                                 stroke='currentColor'
                                 className='w-5 h-5'
                              >
                                 <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                                 />
                              </svg>
                              <span className='translate-y-[1px]'>{item.vote_average.toFixed(1)}/10</span>
                           </div>
                           <div className='w-1 h-1 rounded-full bg-white'></div>
                           <div className='flex items-center gap-x-1'>
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 fill='none'
                                 viewBox='0 0 24 24'
                                 strokeWidth={1.5}
                                 stroke='currentColor'
                                 className='w-5 h-5'
                              >
                                 <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                                 />
                                 <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                 />
                              </svg>
                              {item.vote_count}
                           </div>
                        </div>
                        <p className='text-base'>{item.overview}</p>
                        <div className='flex items-center gap-x-4 text-base font-medium mt-2'>
                           <Link
                              href={`/movie/${item.id}#trailer`}
                              className='flex font-semibold items-center btn gap-x-2 bg-primary py-3 px-4 rounded'
                           >
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 viewBox='0 0 24 24'
                                 fill='currentColor'
                                 className='w-5 h-5'
                              >
                                 <path
                                    fillRule='evenodd'
                                    d='M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z'
                                    clipRule='evenodd'
                                 />
                              </svg>
                              PLAY NOW
                           </Link>
                           <Link
                              href={`/movie/${item.id}`}
                              className='flex btn items-center gap-x-2 bg-blue-500 py-3 px-4 rounded'
                           >
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 viewBox='0 0 20 20'
                                 fill='currentColor'
                                 className='w-5 h-5'
                              >
                                 <path
                                    fillRule='evenodd'
                                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z'
                                    clipRule='evenodd'
                                 />
                              </svg>
                              VIEW INFO
                           </Link>
                        </div>
                     </div>
                     <div className='hidden md:block w-1/2'>
                        <div className='w-[260px] mx-auto aspect-[2/3] flex-shrink-0'>
                           {/* eslint-disable-next-line @next/next/no-img-element */}
                           <img
                              src={getImg(item.poster_path)}
                              alt={item.title}
                              className='w-full h-full object-cover rounded-lg'
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </SwiperSlide>
         ))}
      </Swiper>
   )
}
