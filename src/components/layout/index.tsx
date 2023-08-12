import React from "react";
import Head from 'next/head';
import { NavbarMenu } from "../header";

interface LayoutProps {
    children: React.ReactNode,
    title: string
}

const links = [
    { title: 'Home', url: '/' },
    { title: 'Users', url: '/users' },
    // Add more links as needed
];
const transformedLinks = links.map(link => ({
    label: link.title,
    link: link.url,
}));

export default function Layout({children, title}: LayoutProps){
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <NavbarMenu links={transformedLinks}/>
            {children}
        </>
    )
}