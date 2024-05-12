'use server';

import {redirect} from 'next/navigation';
import pb from '@/app/lib/pocketbase';
import {cookies} from 'next/headers';

export async function login(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
        const {token, record: model} = await pb
            .collection('users')
            .authWithPassword(username, password);

        const cookie = JSON.stringify({token, model});
        console.log("cookie: ", cookie);

        cookies().set('pb_auth', cookie, {
            secure: true,
            path: '/',
            sameSite: 'strict',
            httpOnly: true,
        });
    } catch (err) {
        console.log(err);
    }

    redirect('/');
}

export async function loginAdmin(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
        const {token, record: model} = await pb
            .admins
            .authWithPassword(username, password);

        const cookie = JSON.stringify({token, model});
        console.log("cookie: ", cookie);

        cookies().set('pb_admin', cookie, {
            secure: true,
            path: '/',
            sameSite: 'strict',
            httpOnly: true,
        });
    } catch (err) {
        console.log(err);
    }
    redirect('/adminPage');
}

export async function logout(props: any) {
    cookies().delete('pb_auth');
    cookies().delete('image');
    redirect('/');
}
export async function logoutAdmin(props: any) {
    cookies().delete('pb_admin');
    cookies().delete('word');
    redirect('/signInAdmin');
}
