import { Outlet } from "react-router-dom";
import assets from "../../assets/index.ts";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn.ts";
import LoopUtil from "@/components/utils/loop.util.tsx";
import RouteItem, { INavRoute, navLeftRoute, navRightRoute,loginRoute } from "@/components/nav/user/index.tsx";
import { ChatBot, GoogleMap, LoadingLine } from "@/components/ui";
import { useBoolean, useScreen } from "@/hooks";
import HeaderTop from "@/components/nav/user/header-top.tsx";
const ggMapSrc: string = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.733926172038!2d108.25065207589115!3d15.975265441945124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108997dc971f%3A0x1295cb3d313469c9!2sVietnam%20-%20Korea%20University%20of%20Information%20and%20Communication%20Technology!5e0!3m2!1sen!2s!4v1728663154047!5m2!1sen!2s"
export default function Userlayout() {
  const { value: isOpenNav, autoChange } = useBoolean()
  const { value: isFixedNav, setValue: setValueFixedNav } = useBoolean()
  const { value: openMap, autoChange: autoChangeValueMap } = useBoolean()
  const { isMobile } = useScreen()

  const topRef = useRef<HTMLDivElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const scrollHandler = (_: Event) => {
    setValueFixedNav(window.scrollY > 100)
  }
  const onTop = () => topRef?.current?.scrollIntoView({ behavior: 'smooth' })
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, []);
  return (
    <section className="min-w-screen min-h-screen transition-all">
      <div ref={topRef} />
      <LoadingLine />
      <ChatBot className={cn('fixed right-5 md:right-10 z-50', {
        'bottom-5 md:bottom-10': !isFixedNav,
        'bottom-20 md:bottom-28': isFixedNav
      })} />
      <GoogleMap src={ggMapSrc} close={autoChangeValueMap} open={openMap} />
      <div className={cn('fixed right-5 md:right-10 bottom-5 md:bottom-10 z-50', {
        'hidden': !isFixedNav
      })}>
        <button onClick={onTop}>
          <img src={assets.UpIcon} alt="up" className="w-12 h-12 md:w-14 md:h-14 rounded-full p-2 shadow border bg-white" />
        </button>
      </div>
      <header>
        {/* HeaderTop FOR DESKTOP  */}
        {!isMobile && <HeaderTop autoChangeValueMap={autoChangeValueMap} />}
        <section className={cn({
          "fixed top-0 w-full z-30": isFixedNav
        })}>
          {/* FOR MOBILE  */}
          {isMobile && <div className="lg:hidden flex justify-between items-center px-4 py-2 bg-white border-b">
            {/* LOGO MOBILE */}
            <div className="bg-white rounded-full flex items-center">
              <a href="/">
                <img
                  src={assets.AppIcon}
                  alt="logo"
                  className={'w-8 h-8'}
                />
              </a>
              <h1 className="font-semibold text-my_color_primary">RL Dental Clinic</h1>
            </div>
            <button onClick={autoChange}>
              <i className={cn("fa-solid text-2xl text-my_color_primary", {
                'fa-bars': !isOpenNav,
                'fa-xmark': isOpenNav
              })}></i>
            </button>
          </div>}

          <nav className={cn('bg-white border-b px-4 py-4 flex flex-col lg:flex-row justify-around lg:items-center lg:px-0 gap-6', {
            'hidden': isMobile && !isOpenNav,
          })}>

            {isMobile && <HeaderTop autoChangeValueMap={autoChangeValueMap} />}
            {/* LIST LINK LEFT  */}
            <ul className='flex flex-col lg:flex-row justify-around lg:items-center gap-6'>
              <LoopUtil
                data={navLeftRoute}
                render={(route: INavRoute) => <RouteItem route={route} />}
              />
              <RouteItem route={loginRoute}/>
            </ul>

            {/* LOGO ICONIC  */}
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
            
            {/* LIST LINK RIGHT  */}
            <ul className='flex flex-col lg:flex-row justify-around lg:items-center gap-6'>
              <LoopUtil
                data={navRightRoute}
                render={(route: INavRoute) => <RouteItem route={route} />}
              />
            </ul>
          </nav>
        </section>
      </header>
      <main className={cn(' min-w-full min-h-full')}>
        <Outlet />
      </main>
    </section>
  );
}
