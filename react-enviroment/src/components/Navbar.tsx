// src/components/Navbar.tsx
import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/authContext/authProvider.tsx'; // Import useAuth hook

const navigation = [
  { name: 'Fragrances', href: '/fragrances' },
  { name: 'Brands', href: '/brands' },
  { name: 'Notes', href: '/notes' },
  { name: 'About', href: '/about' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const location = useLocation(); // Get current location to highlight active link
  const { user, loading, login, logout } = useAuth(); // Access auth state and actions

  return (
    <Disclosure as="nav" className="bg-white h-24">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-24 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </Disclosure.Button>
          </div>

          {/* Home Link */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/" className="flex flex-shrink-0 items-center">
              <span className="text-4xl mr-5 font-semibold text-black font-title hover:bg-gray-200 p-2 rounded-md">
                SCENTOPEDIA
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4 items-center">
              {/* Navigation Links with Hover Effects */}
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-500 hover:text-white',
                      'rounded-md px-3 py-2 text-md font-medium transition duration-150 ease-in-out'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Search Bar */}
              <div className="ml-10 pl-16 flex items-center space-x-2">
                <input
                  type="text"
                  className="block w-64 px-4 py-2 border-2 border-gray-700 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Search fragrances..."
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-white text-gray-900 rounded-md border-2 border-gray-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {loading ? (
              <span className="text-gray-900 font-semibold font-lg ml-10">Loading...</span>
            ) : user ? (
              // User is logged in
              <>
                <Link
                  to="/my-lists"
                  className="text-gray-900 font-semibold font-lg mr-4 px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-300 transition duration-150 ease-in-out"
                >
                  My Lists
                </Link>
                <Link to="/profile">
                  <img
                    src={user.photoURL || '/default-avatar.png'} // Show profile picture or default
                    alt="Profile"
                    className="h-8 w-8 rounded-full cursor-pointer hover:ring-2 hover:ring-indigo-500 transition duration-150 ease-in-out"
                  />
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-900 font-semibold font-lg ml-4 px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-300 transition duration-150 ease-in-out"
                >
                  Sign Out
                </button>
              </>
            ) : (
              // User is not logged in
              <button
                onClick={login}
                className="text-gray-900 font-semibold font-lg ml-10 px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-300 transition duration-150 ease-in-out"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as={Link}
              to={item.href}
              className={classNames(
                location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium transition duration-150 ease-in-out'
              )}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
