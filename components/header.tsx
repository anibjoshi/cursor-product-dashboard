"use client";

import Link from 'next/link';
import styles from '@/styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>Your Project</Link>
        <ul className={styles.navItems}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}