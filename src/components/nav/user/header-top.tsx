import assets from '@/assets'
import constantHelper from '@/helper/constant.helper'
import React from 'react'
interface IHeaderTopProps {
    autoChangeValueMap: () => void
}
const HeaderTop: React.FC<IHeaderTopProps> = ({ autoChangeValueMap }) => {
    return (
        <section className="lg:py-5 lg:flex justify-around items-center bg-white rounded-lg lg:p-5">
            <section className="flex justify-center mb-4 lg:mb-0">
                <a href="/"><img src={assets.LogoSysRmBg} alt="logo" className="w-32 lg:w-20" /></a>
            </section>

            <section className="md:flex gap-6 py-2 px-4">

                <section className="flex justify-start items-center space-x-3 hover:bg-gray-100 rounded-lg p-2 transition duration-300" onClick={autoChangeValueMap}>
                    <i className="fa-solid fa-location-dot text-3xl text-blue-600"></i>
                    <div>
                        <h1 className="text-lg font-semibold hover:underline cursor-pointer">{constantHelper.addressCurrent}</h1>
                        <p className="text-gray-500 text-sm">
                            Địa chỉ Ron Link
                        </p>
                    </div>
                </section>

                <section className="flex justify-start items-center space-x-3 hover:bg-gray-100 rounded-lg p-2 transition duration-300">
                    <i className="fa-solid fa-phone text-3xl text-green-600">
                    </i>
                    <div>
                        <h1 className="text-lg font-semibold">
                            <a href={`https://zalo.me/${constantHelper.phoneSystem}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{constantHelper.phoneSystem}</a>
                        </h1>
                        <p className="text-gray-500 text-sm">Số hotline đặt lịch hẹn</p>
                    </div>
                </section>

                <section className="flex justify-start items-center space-x-3 hover:bg-gray-100 rounded-lg p-2 transition duration-300">
                    <i className="fa-regular fa-clock text-3xl text-yellow-600"></i>
                    <div>
                        <h1 className="text-lg font-semibold">{constantHelper.dateOpen}</h1>
                        <p className="text-gray-500 text-sm">{constantHelper.timeOpen}</p>
                    </div>
                </section>

            </section>
        </section>
    )
}

export default HeaderTop
