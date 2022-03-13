import { fun1, fun6, fun7, fun8 } from './update-page' 

export const routers = [
    {
        path:'/',
        component: fun1,
        meta: { auth: false}
    },
    // {
    //     path:'/page1',
    //     component: fun2,
    //     meta: { auth: true}
    // },
    // {
    //     path:'/page2',
    //     component: fun3,
    //     meta: { auth: false}
    // },
    // {
    //     path:'/page3',
    //     component: fun4,
    //     meta: { auth: false}
    // }, 
    {
        path:'/search',
        component: fun6,
        meta: { auth: false}
    },
    {
        path:'/category',
        component: fun7,
        meta: { auth: false}
    },
    {
        path:'/goods',
        component: fun8,
        meta: { auth: false}
    }
];

