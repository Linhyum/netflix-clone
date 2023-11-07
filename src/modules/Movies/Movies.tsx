'use client'
import { getPopular, getSearch, getUpComing } from '@/apis/app.api'
import MovieItem from '@/components/MovieItem/MovieItem'
import MovieItemSkeleton from '@/components/MovieItemSkeleton/MovieItemSkeleton'
import Paginate from '@/components/Paginate/Paginate'
import useReloadPage from '@/hooks/useReloadPage'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Movies({ tv = false }: { tv?: boolean }) {
   const { currentPage, setCurrentPage } = useReloadPage()
   const [searchValue, setSearchValue] = useState<string>('')
   const router = useRouter()
   const pathname = usePathname()

   const { handleSubmit, register } = useForm<{ search: string }>({
      defaultValues: {
         search: ''
      }
   })
   const handleSearch = handleSubmit((data) => {
      if (data.search.trim() !== '') {
         setSearchValue(data.search)
      } else {
         setSearchValue('')
      }
   })

   const { data } = useQuery({
      queryKey: ['movies', currentPage],
      queryFn: () => (tv ? getPopular('tv', currentPage) : getUpComing(currentPage))
   })
   const movies = data?.data.results
   const totalPages = data?.data.total_pages

   const { data: data2 } = useQuery({
      queryKey: ['search', searchValue, currentPage],
      queryFn: () => getSearch(searchValue, currentPage),
      enabled: Boolean(searchValue)
   })
   const searchResult = data2?.data.results
   const totalPagesSearch = data2?.data.total_pages

   const handlePageClick = (e: { selected: number }) => {
      if (totalPages) {
         setCurrentPage(e.selected + 1)
         router.push(`${pathname}?page=${e.selected + 1}`)
      }
   }

   return (
      <div className='pt-20 py-10 container'>
         <form
            onSubmit={handleSearch}
            className='flex items-center overflow-hidden rounded bg-slate-600 h-10 w-full sm:max-w-xs ml-auto'
         >
            <input
               {...register('search')}
               type='text'
               className='flex-1 bg-transparent outline-none px-3'
               placeholder='Search movies...'
            />
            <button type='submit' className='flex-shrink-0 bg-primary h-full px-3'>
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
                     d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
               </svg>
            </button>
         </form>
         <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-6'>
            {searchValue
               ? searchResult
                  ? searchResult.map((item) => <MovieItem key={item.id} item={item} />)
                  : Array(12)
                       .fill(0)
                       .map((_, index) => <MovieItemSkeleton key={index} />)
               : movies
               ? movies.map((item) => <MovieItem key={item.id} item={item} />)
               : Array(12)
                    .fill(0)
                    .map((_, index) => <MovieItemSkeleton key={index} />)}
         </div>
         <Paginate
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={
               searchValue
                  ? (totalPagesSearch as number) > 400
                     ? 400
                     : (totalPagesSearch as number)
                  : (totalPages as number) > 400
                  ? 400
                  : (totalPages as number)
            }
            handlePageClick={handlePageClick}
         />
      </div>
   )
}
