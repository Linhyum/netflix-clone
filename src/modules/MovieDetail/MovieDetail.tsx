'use client'
import { getCast, getMovieDetail, getSimilar, getVideo } from '@/apis/app.api'
import { getImg } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import React from 'react'
import MovieList from '@/components/MovieList/MovieList'
import { Result } from '@/types/movieList.type'
import useAddFavourite from '@/hooks/useAddLibrary'
import Loading from '@/components/Loading/Loading'
import { useEffect } from 'react'

export default function MovieDetail({ params, tv = false }: { params: { id: number }; tv?: boolean }) {
   const { movieId, handleAddFavourite } = useAddFavourite()
   const { data } = useQuery({
      queryKey: ['movieDetail', params.id],
      queryFn: () => getMovieDetail(params.id, tv ? 'tv' : 'movie')
   })
   const movieDetail = data?.data

   const { data: data2 } = useQuery({
      queryKey: ['video', params.id],
      queryFn: () => getVideo(params.id, tv ? 'tv' : 'movie')
   })
   const video = data2?.data.results

   const { data: data3 } = useQuery({
      queryKey: ['cast', params.id],
      queryFn: () => getCast(params.id, tv ? 'tv' : 'movie')
   })
   const cast = data3?.data.cast

   const { data: data4 } = useQuery({
      queryKey: ['similar', params.id],
      queryFn: () => getSimilar(params.id, tv ? 'tv' : 'movie')
   })
   const similar = data4?.data.results
   useEffect(() => {
      if (movieDetail) {
         document.title = `${movieDetail?.name || movieDetail?.title} | Netflix`
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [params.id])
   if (!movieDetail) return <Loading />
   return (
      <>
         <div
            className='min-h-screen bg-center bg-cover relative bg-no-repeat'
            style={{
               backgroundImage: `url(${getImg(movieDetail.backdrop_path)})`
            }}
         >
            <div className='absolute inset-0 bg-black/60'></div>
            <div className='container flex md:flex-row flex-col items-center relative md:absolute inset-0 md:py-0 pt-20 py-10 gap-10'>
               <div className='w-[75%] sm:w-1/2 md:w-[25%] mx-auto md:mx-0 aspect-[2/3] flex-shrink-0'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                     loading='lazy'
                     src={getImg(movieDetail.poster_path)}
                     alt={tv ? movieDetail.name : movieDetail.title}
                     className='w-full h-full object-cover rounded-lg'
                  />
               </div>
               <div className='w-full md:w-[75%] text-base flex flex-col gap-y-3'>
                  <h2 className='font-bold text-3xl'>{tv ? movieDetail.name : movieDetail.title}</h2>
                  <p>{movieDetail.overview}</p>
                  <span>Release Date: {tv ? movieDetail.first_air_date : movieDetail.release_date}</span>
                  <div className='flex items-center gap-x-3'>
                     {movieDetail.genres.map((item) => (
                        <div className='border-2 border-white rounded-full py-2 px-4' key={item.id}>
                           {item.name}
                        </div>
                     ))}
                  </div>
                  <div className='flex items-center gap-x-3'>
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
                        <span className='translate-y-[1px]'>{movieDetail.vote_average.toFixed(1)}/10</span>
                     </div>
                     <div className='w-1 h-1 rounded-full bg-white'></div>
                     <div className='flex items-center gap-x-1 translate-y-[1px]'>
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
                           <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                        </svg>
                        {movieDetail.vote_count}
                     </div>
                  </div>
                  <div className='flex items-center gap-x-5'>
                     <Link
                        href={`/${tv ? 'tv' : 'movie'}/${movieDetail.id}#trailer`}
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
                     <button
                        onClick={(e) => handleAddFavourite(e, movieDetail.id, movieDetail as unknown as Result)}
                        className='flex items-center gap-x-2 text-base font-semibold border-2 border-[#E4D804] px-4 py-2.5 hover:bg-[#E4D804] hover:text-black transition-all rounded'
                     >
                        {movieId.includes(movieDetail.id) ? (
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              xmlnsXlink='http://www.w3.org/1999/xlink'
                              aria-hidden='true'
                              role='img'
                              className='iconify iconify--ph'
                              width={20}
                              height={20}
                              viewBox='0 0 256 256'
                           >
                              <path
                                 fill='currentColor'
                                 d='M239.81 99.5c-5.19 67.42-103.7 121.23-108 123.54a8 8 0 0 1-7.58 0C119.8 220.67 16 164 16 94a62 62 0 0 1 96.47-51.55a4 4 0 0 1 .61 6.17L99.72 62a8 8 0 0 0 0 11.31l32.53 32.53L111 127a8 8 0 1 0 11.31 11.31l26.88-26.87a8 8 0 0 0 0-11.31l-32.49-32.5l17.47-17.47A61.63 61.63 0 0 1 178.41 32c36.32.23 64.18 31.29 61.4 67.5Z'
                              />
                           </svg>
                        ) : (
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='w-6 h-6'
                           >
                              <path
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                              />
                           </svg>
                        )}
                        {movieId.includes(movieDetail.id) ? 'Unlike' : 'Favourite'}
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div className='container py-10 flex flex-col gap-y-10'>
            {/* Trailer */}
            {video && (
               <div id='trailer'>
                  <h2 className='mb-3 text-3xl font-bold'>Trailer</h2>
                  <div className='aspect-video max-w-4xl mx-auto'>
                     <iframe
                        width='768'
                        height='432'
                        src={`https://www.youtube.com/embed/${video[0]?.key}`}
                        title={movieDetail.title}
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        allowFullScreen
                        className='object-fill w-full h-full'
                     ></iframe>
                  </div>
               </div>
            )}

            {/* Cast */}
            {cast && (
               <div>
                  <h2 className='mb-3 text-3xl font-bold'>Cast ({cast.length})</h2>
                  <Swiper
                     modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                     spaceBetween={25}
                     slidesPerView={4}
                     navigation //Kích hoạt điều hướng (nút prev và next) cho slider.
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
                     {cast.map((item) => (
                        <SwiperSlide key={item.id}>
                           <div className='aspect-[2/3] relative rounded-lg overflow-hidden group'>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                 loading='lazy'
                                 src={getImg(item.profile_path)}
                                 alt={item.name}
                                 className='w-full group-hover:scale-110 transition-all duration-300 h-full object-cover'
                              />
                              <div className='absolute bottom-0 bg-gradient h-1/2 inset-x-0 p-3 gap-y-2 flex flex-col items-center justify-end'>
                                 <span className='text-2xl font-bold'>{item.name}</span>
                                 <span className='text-lg text-primary font-semibold'>{item.character}</span>
                              </div>
                           </div>
                        </SwiperSlide>
                     ))}
                  </Swiper>
               </div>
            )}

            {/* Similar */}
            {similar && <MovieList title='Similar Movies' result={similar} />}
         </div>
      </>
   )
}
