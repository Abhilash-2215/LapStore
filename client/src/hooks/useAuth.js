import { useState, useEffect } from "react";

function useAuth() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {

            setUser({
                loggedIn: true
            });

        }

    }, []);

    return user;

}

export default useAuth;