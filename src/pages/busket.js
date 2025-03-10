import React from 'react';
import Header from '../components/Header';
import { Main } from 'next/document';
export default function Busket() {
    return(
    <main className="min-h-screen">
        <Header className="bg-green-300"/>
        <p>карзина</p>
    </main> 
    );
}