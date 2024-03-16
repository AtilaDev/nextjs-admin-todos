import Link from 'next/link';

interface Props {
  href: string;
  text: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export const SidebarItem = ({ href, text, icon }: Props) => {
  return (
    <li>
      <Link
        href={href}
        className='relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400'
      >
        {icon}
        <span className='-mr-1 font-medium'>{text}</span>
      </Link>
    </li>
  );
};
