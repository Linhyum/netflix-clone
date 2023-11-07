import { useContext } from 'react'
import useLocalStorage from './useLocalStorage'
import { AppContext } from '@/context/app.context'
import { Result } from '@/types/movieList.type'

export default function useAddFavourite() {
   const [movieId, setMovieId] = useLocalStorage<number[]>('favouriteNetFlix', []) //thêm vào thư viện
   const { setFavourite } = useContext(AppContext)
   //thêm vào thư viện
   const handleAddFavourite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number, movie: Result) => {
      e.stopPropagation()
      if (movieId.includes(id)) {
         setMovieId((prev) => prev.filter((item) => item !== id))
         setFavourite((prev) => prev.filter((item) => item.id !== id))
      } else {
         setMovieId((prev) => [...prev, id])
         setFavourite((prev) => [...prev, movie])
      }
   }
   return { movieId, handleAddFavourite }
}
