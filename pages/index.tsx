
import Link from 'next/link';
import { useState } from 'react';

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link href="/">
                          Website
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <Link href="/">
                            Home
                        </Link>
                        <Link href="/todo/todoindex">
                          To Do List
                        </Link>
                        <Link href="/services">
                          Service
                        </Link>
                        <Link href="/contact">
                           Contact
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="focus:outline-none text-white hover:text-gray-200"
                            aria-label="Toggle menu"
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-blue-700">
                    <Link href="/">
                      Home
                    </Link>
                    <Link href="/about">
                       About
                    </Link>
                    <Link href="/services">
                       Services
                    </Link>
                    <Link href="/contact">
                        Contact
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
