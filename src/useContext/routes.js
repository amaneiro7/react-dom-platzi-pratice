export const routes = [
    {
        id: 1,
        to: '/',
        text: "home",
        auth: "static"
    },
    {
        id: 2,
        to: '/blog',
        text: "blog",
        auth: "static"
    },
    {
        id: 3,
        to: '/profile/',
        text: "profile",
        auth: "private"
    },
    {
        id: 4,
        to: '/login',
        text: "Login",
        auth: "public"
    },
    {
        id: 5,
        to: '/register',
        text: "Register",
        auth: "public"
    },
    {
        id: 6,
        to: '/logout',
        text: "Logout",
        auth: "private"
    }
]