'use client'
import MovieItem from '@/components/MovieItem/MovieItem'
import { AppContext } from '@/context/app.context'
import React, { useContext, useEffect } from 'react'

export default function Favourite() {
   const { favourite } = useContext(AppContext)
   useEffect(() => {
      document.title = 'Favourite Movies | Netflix'
   }, [])
   return (
      <div className='py-20 container'>
         <h2 className='text-3xl mb-3 font-bold'>Favourite Movies</h2>
         {favourite.length > 0 ? (
            <div className='grid lg:grid-cols-4 lg:gap-5 md:grid-cols-3 md:gap-4 gap-3 grid-cols-2 xl:gap-6 min-h-[calc(100vh-300px)]'>
               {favourite?.map((item) => (
                  <MovieItem key={item.id} item={item} />
               ))}
            </div>
         ) : (
            <div className='h-[calc(100vh-300px)]'>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img
                  src='https://cdni.iconscout.com/illustration/premium/thumb/no-transaction-7359562-6024630.png'
                  alt='no-favourite'
                  loading='lazy'
                  className='w-80 h-[265px] mt-5 object-cover mx-auto'
               />
               {/* eslint-disable-next-line react/no-unescaped-entities */}
               <p className='font-bold text-xl text-center'>You don't have any favorite movies yet</p>
            </div>
         )}
      </div>
   )
}
