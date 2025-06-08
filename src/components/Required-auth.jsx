import { useUrlState } from '@/UrlContext';
import { isAuthApiError } from '@supabase/supabase-js';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarLoader } from 'react-spinners';

function RequiredAuth({children}) {
    const navigate = useNavigate();
    const {isAuthenticated, loading} = useUrlState();

    useEffect(()=>{
        if(!isAuthenticated && !loading){
            navigate('/auth');
        }
    }, [isAuthenticated, loading])
    
    if(loading) return <BarLoader width={"100%"} color='#36d7b7' />;
    if(isAuthenticated) return children;
}

export default RequiredAuth