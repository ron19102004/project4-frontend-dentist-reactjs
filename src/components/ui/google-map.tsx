import { cn } from '@/lib/cn'
import React from 'react'
interface IGoogleMap {
    src: string,
    open: boolean,
    close: () => void
}
const GoogleMap: React.FC<IGoogleMap> = ({ close, open, src }) => {
    return open && <section className='fixed h-[100%] w-[100%] flex flex-col justify-center items-center z-50 bg-transparent backdrop-blur-sm transition-all'>
        <div className={'w-[90%] h-[80%] rounded-lg shadow-lg border-2 border-my_color_primary '}>
            <div className='bg-my_color_primary w-full flex justify-end items-center py-2 px-6 '>
                <button className='cursor-pointer' onClick={close}>
                    <i className="fa-solid fa-xmark cursor-pointer text-white"></i>
                </button>
            </div>
            <iframe src={src} allowFullScreen={true} loading="lazy" className={cn('w-full h-[calc(100%-40px)] rounded-b-lg')} referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </section>
}

export default GoogleMap
