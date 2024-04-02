import Image from 'next/image';
import Link from 'next/link';
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoListOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import { LogoutButton, SidebarItem } from '..';
import { BsCookie } from 'react-icons/bs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const menuItems = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: <IoCalendarOutline />,
  },
  {
    path: '/dashboard/rest-todos',
    title: 'Rest TODOS',
    icon: <IoCheckboxOutline />,
  },
  {
    path: '/dashboard/server-todos',
    title: 'Server Actions',
    icon: <IoListOutline />,
  },
  {
    path: '/dashboard/cookies',
    title: 'Cookies',
    icon: <BsCookie />,
  },
  {
    path: '/dashboard/products',
    title: 'Products',
    icon: <IoBasketOutline />,
  },
  {
    path: '/dashboard/profile',
    title: 'Perfil',
    icon: <IoPersonOutline />,
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  const userName = session?.user?.name!;
  const imageUrl = session?.user?.image;
  const userRoles = session?.user?.roles ?? ['no-roles'];

  return (
    <aside className='ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
      <div>
        <div className='-mx-6 px-6 py-4'>
          <Link href='#' title='home'>
            <Image
              src='https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg'
              className='w-32'
              alt='tailus logo'
              width={32}
              height={32}
            />
          </Link>
        </div>

        <div className='mt-8 text-center'>
          {imageUrl ? (
            <Image
              src={imageUrl}
              className='w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28'
              alt=''
              width={32}
              height={32}
            />
          ) : (
            <Image
              src='https://directemployers.org/wp-content/uploads/2018/08/avatar-JohnDoe.jpg'
              className='w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28'
              alt=''
              width={32}
              height={32}
            />
          )}

          <h5 className='hidden mt-4 text-xl font-semibold text-gray-600 lg:block'>
            {userName}
          </h5>
          <span className='hidden text-gray-400 lg:block capitalize'>
            {userRoles.join(', ')}
          </span>
        </div>

        <ul className='space-y-2 tracking-wide mt-8'>
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className='px-6 -mx-6 pt-4 flex justify-between items-center border-t'>
        <LogoutButton />
      </div>
    </aside>
  );
};
