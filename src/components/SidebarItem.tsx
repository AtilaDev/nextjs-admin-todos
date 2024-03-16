'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  path: string;
  title: string;
  icon: React.ReactNode;
}

export const SidebarItem = ({ path, title, icon }: Props) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={`px-4 py-3 flex items-center space-x-4 rounded-md group
        hover:bg-gradient-to-r hover:from-sky-600 hover:to-cyan-400 hover:text-white
        ${
          path === pathname
            ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400'
            : ''
        }`}
      >
        {icon}
        <span className='group-hover:text-white'>{title}</span>
      </Link>
    </li>
  );
};
