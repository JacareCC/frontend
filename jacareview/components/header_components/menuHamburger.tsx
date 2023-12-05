import { Fragment, useState } from 'react';
import { Popover, Transition, Dialog } from '@headlessui/react';
import { Bars3Icon, 
    UserCircleIcon, 
    MagnifyingGlassIcon, 
    ArrowLeftOnRectangleIcon,
    BriefcaseIcon,
    BookmarkIcon,
    CursorArrowRaysIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import LogoutConfirm from './LogoutConfirm';

const solutions = [
  { name: 'Profile',  href: '/user', icon: UserCircleIcon },
  { name: 'Search',  href: '/search', icon: MagnifyingGlassIcon },
  { name: 'My Business',  href: '/user/business', icon: BriefcaseIcon },
  { name: 'Saved Restaurants',  href: '/restaurants/saved', icon: BookmarkIcon },
//   { name: 'Viewed Restaraunts',  href: '/restaurantsviewed', icon: CursorArrowRaysIcon },
  { name: 'Logout', href: '#', icon: ArrowLeftOnRectangleIcon },
];

export default function MenuHamburger() {
    const router = useRouter();
    const [popUp, setPopUp] = useState<boolean>(false);

    const handleItemClick = (href: string) => {
        if (href !== '#') {
            router.push(href);
        } else {
            setPopUp(true);
        }
    };

    const confirmLogout = async () => {
        const auth = getAuth();
        await signOut(auth);
        router.push('/');
    };

    const closeDialog = () => {
        setPopUp(false);
    };

    return (
        <Popover className="relative">
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
                <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute right-0 z-10 mt-8 flex px-2">
                    <div className="flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                        <div className="p-1">
                            {solutions.map((item) => (
                                <div key={item.name} className="group relative flex content-center items-center gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <a href={item.href} onClick={() => handleItemClick(item.href)} className="font-semibold text-gray-900">
                                            {item.name}
                                            <span className="absolute inset-0" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        <LogoutConfirm open={popUp} onClose={closeDialog} onConfirm={confirmLogout} />
        </Popover>
    );
}
