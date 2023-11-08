'use client'
import React from 'react'
import HomeBanner from '@/components/HomeBanner/HomeBanner'
import { useQuery } from '@tanstack/react-query'
import { getPopular, getTopRated, getTrending } from '@/apis/app.api'
import MovieList from '@/components/MovieList/MovieList'
import Loading from '@/components/Loading/Loading'
export default function Home() {
   //popular
   const { data } = useQuery({
      queryKey: ['popular'],
      queryFn: () => getPopular('movie', 1),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10
   })
   const popular = data?.data.results

   //trending
   const { data: data2 } = useQuery({
      queryKey: ['trending'],
      queryFn: () => getTrending('movie'),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10
   })
   const trending = data2?.data.results

   //topRated
   const { data: data3 } = useQuery({
      queryKey: ['topRated'],
      queryFn: () => getTopRated('movie'),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10
   })
   const topRated = data3?.data.results

   //popular tv
   const { data: data4 } = useQuery({
      queryKey: ['popularTV'],
      queryFn: () => getPopular('tv', 1),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10
   })
   const popularTV = data4?.data.results

   //trending tv
   const { data: data5 } = useQuery({
      queryKey: ['trendingTV'],
      queryFn: () => getTrending('tv'),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10
   })
   const trendingTV = data5?.data.results

   //topRated tv
   const { data: data6 } = useQuery({
      queryKey: ['topRatedTV'],
      queryFn: () => getTopRated('tv'),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10
   })
   const topRatedTV = data6?.data.results
   if (!popular || !trending) return <Loading />
   return (
      <>
         <HomeBanner popular={popular} />
         <div className='container py-10  flex flex-col gap-y-10'>
            <MovieList title='Trending Movies' result={trending} />
            <MovieList title='Popular Movies' result={popular} />
            {topRated && <MovieList title='Top Rated Movies' result={topRated} />}
            {trendingTV && <MovieList title='Trending TV' result={trendingTV} />}
            {popularTV && <MovieList title='Popular TV' result={popularTV} />}
            {topRatedTV && <MovieList title='Top Rated TV' result={topRatedTV} />}
         </div>
      </>
   )
}
