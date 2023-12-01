import { Fragment, useState } from 'react';
import { Popover, Transition, Dialog } from '@headlessui/react';
import { Bars3Icon, 
    UserCircleIcon, 
    UserPlusIcon,
    CursorArrowRaysIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import LogoutConfirm from './LogoutConfirm';
import { initFirebase } from '@/firebase/firebaseapp';
import { useAuthState } from 'react-firebase-hooks/auth';

const solutions = [
  { name: 'Login',  href: '/userpage', icon: UserCircleIcon },
//   { name: 'Register',  href: '/searchpage', icon: UserPlusIcon },
];

export default function MenuHamburgerHome() {
    const [popUp, setPopUp] = useState<boolean>(false);

    initFirebase();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth)
    const router = useRouter();

    async function signIn () {
        const result = await signInWithPopup(auth, provider);
        setUid(result.user.uid);
        setLoginTry((prev:boolean) => !prev);
    }

    const handleItemClick = (href: string) => {
        if (href === '/login') {
            signIn();
        } else {
            
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
function setUid(uid: string) {
    throw new Error('Function not implemented.');
}

function setLoginTry(arg0: (prev: boolean) => boolean) {
    throw new Error('Function not implemented.');
}

