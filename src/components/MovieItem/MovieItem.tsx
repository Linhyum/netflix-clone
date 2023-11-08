import { Result } from '@/types/movieList.type'
import { getImg } from '@/utils/utils'
import Link from 'next/link'
import React from 'react'
interface Props {
   item: Result
}
export default function MovieItem({ item }: Props) {
   return (
      <Link
         href={`/${item.name ? 'tv' : 'movie'}/${item.id}`}
         className='aspect-[2/3] relative rounded-lg overflow-hidden block group'
      >
         {/* eslint-disable-next-line @next/next/no-img-element */}
         <img
            src={getImg(item.poster_path)}
            alt={item.name || item.title}
            loading='lazy'
            className='w-full h-full object-cover group-hover:scale-110 transition-all duration-300'
         />
         <div className='absolute bottom-0 bg-gradient h-1/2 inset-x-0 p-3 gap-y-2 flex flex-col items-center justify-end'>
            <h3 className='text-xl font-bold text-center'>{item.name || item.title}</h3>
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
                     <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                  </svg>
                  {item.vote_count}
               </div>
            </div>
            <Link
               href={`/${item.name ? 'tv' : 'movie'}/${item.id}#trailer`}
               className='flex btn font-semibold flex-shrink-0 items-center gap-x-2 bg-primary py-3 w-full mt-2 justify-center rounded'
            >
               <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
                  <path
                     fillRule='evenodd'
                     d='M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z'
                     clipRule='evenodd'
                  />
               </svg>
               PLAY NOW
            </Link>
         </div>
      </Link>
   )
}
