import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/cn';
import LoopUtil from '@/components/utils/loop.util';
import {useScreen,useBoolean} from '@/hooks';

export interface INavRoute {
  title: string;
  path: string;
  children?: INavRoute[];
}
export const loginRoute: INavRoute = {
  title: 'Đăng nhập',
  path: '/dang-nhap'
}
// eslint-disable-next-line react-refresh/only-export-components
export const navLeftRoute: INavRoute[] = [
  {
    title: 'Trang chủ',
    path: '/trang-chu'
  },
  {
    title: 'Dịch vụ',
    path: '/dich-vu',
  },
  {
    title: 'Chuyên ngành',
    path: '/chuyen-nganh',
  }
]
// eslint-disable-next-line react-refresh/only-export-components
export const navRightRoute: INavRoute[] = [
  {
    title: 'Đội ngũ bác sĩ',
    path: '/bac-si'
  },
  {
    title: 'Hướng dẫn khách hàng',
    path: '/huong-dan'
  },
  {
    title: 'Liên hệ',
    path: '/lien-he'
  },
]

const RouteItem: React.FC<{ route: INavRoute }> = ({ route }) => {
  const { isMobile } = useScreen()
  const { value: isOpen, autoChange } = useBoolean()
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  useEffect(() => { }), [isMobile]
  return (
    <section className="uppercase font-semibold group relative">
      <NavLink
        to={route.path}
        onClick={(e) => {
          if (route.children && isMobile) {
            e.preventDefault()
            autoChange()
          }
        }}
        className={({ isActive }) =>
          cn('', {
            'text-my_color_secondary link-not-active': !isActive,
            'text-my_color_primary font-bold': isActive,
          })
        }
      >
        {route.title}
        {route.children && isMobile && <i className={cn('fa-solid', {
          'fa-caret-down': !isOpen,
          'fa-caret-up': isOpen,
        })}></i>}

      </NavLink>
      {route.children && (
        <ul
          className={cn('left-0 transition-all duration-3000 ease-in-out p-4 z-50 space-y-2',
            {
              'group-hover:block absolute shadow-lg transform translate-y-2 group-hover:translate-y-0 w-96 rounded bg-white': !isMobile,
              'hidden': !isOpen,
            },
          )}
        >
          <LoopUtil
            data={route.children}
            render={(item: INavRoute) => (
              <li className='font-semibold'>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn('hover:text-my_color_secondary', {
                      'text-zinc-900 link-not-active': !isActive,
                      'text-my_color_primary': isActive,
                      'text-my_color_secondary': !isActive && isMobile,
                    })
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            )}
          />
        </ul>
      )}
    </section>
  );
};

export default RouteItem;
