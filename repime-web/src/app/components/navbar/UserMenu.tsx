'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import {useCallback, useState } from 'react';
import MenuItem from './MenuItem';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface UserMenuProps {
    currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const msgResidencia = 'Cadastre sua residência';

    const toggleOpen = useCallback(() =>{
        setIsOpen((value) => !value);
    }, []);
    
    const onResidence = useCallback(() =>{
        if (!currentUser){
            toast.error("Faça login primeiro!");
            return loginModal.onOpen();
        }
        setIsOpen(false);
        return router.push(`/residences/${currentUser?.id}`);
    }, [currentUser, loginModal, router]);

    const onUserPage = useCallback(() =>{
        if (!currentUser){
            toast.error("Faça login primeiro!");
            return loginModal.onOpen();
        }
        setIsOpen(false);
        return router.push(`/user/${currentUser?.id}`);
    }, [currentUser, loginModal, router]);
    
    const loggedOut = useCallback(() => {
        signOut();
        return router.push('/');
    }, [router]);

    return ( 
        <div className="relative">
            <div 
                className="
                    flex
                    flex-row
                    items-center
                    gap-3
                "
            >
                <div 
                    onClick={onResidence}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
                >
                    {msgResidencia}
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image}/>
                    </div>
                </div>
            </div>
            {isOpen && ( 
                <div
                    className="
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                    "
                >
                    <div className="flex flex-col cursor-pointer rounded-xl border-[1px]">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={onResidence}
                                    label="Minhas Residências"
                                />
                                <MenuItem
                                    onClick={() => onUserPage()}
                                    label="Meu perfil"
                                />
                                {currentUser.is_administrador ? (
                                    <>
                                    <MenuItem
                                        onClick={() => {}}
                                        label="Dashboard"
                                    />

                                    <MenuItem
                                        onClick={loggedOut}
                                        label="Log out"
                                    />
                                    </>
                                ) : (
                                    <MenuItem
                                        onClick={loggedOut}
                                        label="Log out"
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label="Sign up"
                                />
                            </>
                        )}
                    </div>   
                </div>
            )}
        </div>
     );
}
 
export default UserMenu;
