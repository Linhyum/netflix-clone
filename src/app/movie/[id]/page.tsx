import MovieDetail from '@/modules/MovieDetail/MovieDetail'
import React from 'react'

export default function page({ params }: { params: { id: number } }) {
   return <MovieDetail params={params} />
}
