'use client'

import { useEffect, useState } from "react";

interface ClienteOnlyProps {
    children: React.ReactNode;
}

const ClienteOnly: React.FC<ClienteOnlyProps> = ({
    children
}) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() =>{
        setHasMounted(true);
    }, []);

    if(!hasMounted) {
        return null;
    }

    return (
        <>
            {children}
        </>
    );
    
}
 
export default ClienteOnly;