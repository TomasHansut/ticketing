import { useEffect } from "react";
import Router from "next/router";
import userRequest from "../hooks/user-request";


// Sign out user
export default () => {
    const { doRequest } = userRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
    });

    // doRequest one time because of []
    useEffect(() => {
        doRequest();
    }, [])

    return <div>Signing you out...</div>
};