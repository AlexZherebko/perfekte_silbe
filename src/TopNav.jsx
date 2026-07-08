import React from 'react';

// Если вы планируете использовать React Router, то вместо <a> будут компоненты <Link>
export default function TopNav() {
    return (
        <nav className="top-nav">
            <a href="index.html">ГЛАВНАЯ</a>
            <a href="info.html">ИНФО</a>
        </nav>
    );
}