import React from 'react'

export default function Loading() {
   return (
      <div
         style={{
            backgroundImage: 'url("https://movies-ax.netlify.app/static/media/background.4791eb57.jpg")'
         }}
         className='fixed bg-center bg-no-repeat bg-cover z-[99999] inset-0 flex items-center justify-center'
      >
         <div className='absolute inset-0 bg-black/90'></div>
         <div className='loader'>
            <div className='justify-content-center jimu-primary-loading' />
         </div>
      </div>
   )
}
