import { Outlet } from "react-router-dom";
import constantHelper from "../../helper/constant.helper";
import assets from "../../assets/index.ts";
import { Fragment, useEffect } from "react";
import { cn } from "@/lib/cn.ts";
import useScreen from "@/hooks/useScreen.hook.tsx";
import useBoolean from "@/hooks/useBoolean.hook.tsx";
import LoopUtil from "@/components/utils/loop.util.tsx";
import RouteItem, { INavRoute, navLeftRoute, navRightRoute } from "@/components/nav/user/index.tsx";
import LoadingLine from "@/components/ui/loadline.tsx";
import GoogleMap from "@/components/ui/google-map.tsx";
const ggMapSrc: string = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.733926172038!2d108.25065207589115!3d15.975265441945124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108997dc971f%3A0x1295cb3d313469c9!2sVietnam%20-%20Korea%20University%20of%20Information%20and%20Communication%20Technology!5e0!3m2!1sen!2s!4v1728663154047!5m2!1sen!2s"
export default function Userlayout() {
  const { value: isOpenNav, autoChange } = useBoolean()
  const { value: isFixedNav, setValue: setValueFixedNav } = useBoolean()
  const { value: openMap, autoChange: autoChangeValueMap } = useBoolean()
  const { isMobile } = useScreen()
  const scrollHandler = (_: Event) => {
    setValueFixedNav(window.scrollY > 100)
  }
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, []);
  return (
    <section className="min-w-screen min-h-screen">
      <LoadingLine />
      <GoogleMap src={ggMapSrc} close={autoChangeValueMap} open={openMap} />
      <header>
        <section>
          <section className="md:flex justify-between items-center py-2 px-4">
            <section className="flex justify-start items-center space-x-2 " onClick={autoChangeValueMap}>
              <i className="fa-solid fa-map text-my_color_primary text-lg cursor-pointer"></i>
              <h1 className="hover:underline cursor-pointer">Nơi ở hiện tại: {constantHelper.addressCurrent}</h1>
            </section>
            <nav>
              <a href="/" className="hover:text-my_color_primary">
                Trang chủ
              </a>
            </nav>
          </section>
          <hr />
          <section className="relative flex justify-between items-center py-5 px-4">
            <section className="flex justify-start items-center space-x-1">
              <div>
                <img src={assets.PhoneIcon} alt="pi" />
              </div>
              <h1 className="space-x-1">
                <span className="uppercase">Khám cấp cứu:</span>
                <span className="text-red-500 font-semibold">0392477615</span>
              </h1>
            </section>
          </section>
        </section>
        <section className={cn({
          "fixed top-0 w-full": isFixedNav
        })}>
          {isMobile && <div className="lg:hidden flex justify-between items-center px-4 py-2 bg-my_color_primary">
            <div className="bg-white w-11 h-11 rounded-full flex flex-col justify-center items-center">
              <img
                src={assets.AppIcon}
                alt="logo"
                className={'w-8 h-8'}
              />
            </div>
            <button onClick={autoChange}>
              <i className={cn("fa-solid text-2xl text-white", {
                'fa-bars': !isOpenNav,
                'fa-xmark': isOpenNav
              })}></i>
            </button>
          </div>}
          <nav className={cn('bg-my_color_primary px-4 py-4 flex flex-col lg:flex-row justify-around lg:items-center lg:px-0 gap-6', {
            'hidden': isMobile && !isOpenNav
          })}>
            <ul className='flex flex-col lg:flex-row justify-around lg:items-center gap-6'>
              <LoopUtil
                data={navLeftRoute}
                render={(route: INavRoute) => <RouteItem route={route} />}
              />
            </ul>
            <section className={cn("hidden absolute bg-white lg:flex flex-col justify-center items-center left-[50%] -translate-x-[50%] shadow-2xl z-30 border", {
              'w-24 h-24 rounded-3xl': !isFixedNav,
              'w-14 h-14 rounded-full': isFixedNav
            })}>
              <a href="/">
                <img
                  src={assets.AppIcon}
                  alt="logo"
                  className={cn(" object-cover", {
                    'w-20 h-20': !isFixedNav,
                    'w-12 h-12': isFixedNav
                  })}
                />
              </a>
            </section>
            <ul className='flex flex-col lg:flex-row justify-around lg:items-center gap-6'>
              <LoopUtil
                data={navRightRoute}
                render={(route: INavRoute) => <RouteItem route={route} />}
              />
            </ul>
          </nav>
        </section>
      </header>
      <main>
        <Outlet />
      </main>
    </section>
  );
}
