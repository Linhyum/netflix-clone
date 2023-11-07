import { CastType } from '@/types/cast.type'
import { MovieDetailType } from '@/types/movieDetail.type'
import { MovieListType } from '@/types/movieList.type'
import { VideoType } from '@/types/video.type'
import http from '@/utils/http'

export const getTrending = (genre: string) =>
   http.get<MovieListType>(`/trending/${genre}/day?api_key=9e4dcf244e30611641c2a44c752a2353`)

export const getPopular = (genre: string, page: number) =>
   http.get<MovieListType>(`/${genre}/popular?api_key=9e4dcf244e30611641c2a44c752a2353&page=${page}`)

export const getTopRated = (genre: string) =>
   http.get<MovieListType>(`/${genre}/top_rated?api_key=9e4dcf244e30611641c2a44c752a2353`)

export const getMovieDetail = (id: number, genre: string) =>
   http.get<MovieDetailType>(`/${genre}/${id}?api_key=9e4dcf244e30611641c2a44c752a2353`)

export const getVideo = (id: number, genre: string) =>
   http.get<VideoType>(`/${genre}/${id}/videos?api_key=9e4dcf244e30611641c2a44c752a2353`)

export const getCast = (id: number, genre: string) =>
   http.get<CastType>(`/${genre}/${id}/credits?api_key=9e4dcf244e30611641c2a44c752a2353`)

export const getSimilar = (id: number, genre: string) =>
   http.get<MovieListType>(`/${genre}/${id}/similar?api_key=9e4dcf244e30611641c2a44c752a2353`)

export const getUpComing = (page: number) =>
   http.get<MovieListType>(`/movie/upcoming?api_key=9e4dcf244e30611641c2a44c752a2353&page=${page}`)

export const getSearch = (query: string, page: number) =>
   http.get<MovieListType>(`/search/movie?api_key=9e4dcf244e30611641c2a44c752a2353&query=${query}&page=${page}`)
