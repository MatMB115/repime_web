'use client';

import { User } from "@prisma/client";
import { usePathname } from "next/navigation";
import EmptyState from "./EmptyState";

interface PrivateRouteProps {
    user: User | null;
    route: string;
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    user,
    route,
    children
}) => {
    const pathname = usePathname();
    const currentPath = route + user?.id

    if(pathname !== currentPath){
        return (
            <EmptyState 
                title="Algo deu errado"
                subtitle="Página não encontrada"
            />
        )
    }

    return (
        <div>
            {children}
        </div>
    );
}

export default PrivateRoute;