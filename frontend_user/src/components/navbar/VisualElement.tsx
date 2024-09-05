import { useState } from "react";
import { Link } from "react-router-dom";

import { Menu, MenuButton, MenuItems, MenuItem, Transition } from "@headlessui/react";

interface NavbarProps {
  title: string;
  username: string;
  isGuest: boolean;
  links: {
    label: string;
    href: string;
  }[];
  onClickAccount: () => void;
  onClickSettings: () => void;
  onClickSignOut: () => void;
  onClickSignupFromGuest: () => void;
}

export const VisualElement: React.FC<NavbarProps> = ({
  title,
  username,
  isGuest,
  links,
  onClickSignOut,
  onClickSettings,
  onClickAccount,
  onClickSignupFromGuest,
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <header id="page-header" className="z-1 flex flex-none items-center bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8 xl:max-w-7xl">
        <div className="flex justify-between py-4">
          {/* Left Section */}
          <div className="flex items-center gap-2 lg:gap-6">
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-2 lg:flex">
              {links.map((link) => (
                <Link
                  to={link.href}
                  className="group flex items-center gap-2 rounded-lg border border-transparent bg-gray-700 px-3 py-2 text-sm font-medium text-white"
                >
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
            {/* END Desktop Navigation */}
          </div>
          {/* END Left Section */}

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* User Dropdown */}
            {isGuest && (
              <button
                className="hidden lg:inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 "
                onClick={onClickSignupFromGuest}
              >
                Signup Here
              </button>
            )}
            <Menu as="div" className="relative inline-block gap-2">
              {/* Dropdown Toggle Button */}
              <MenuButton className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-semibold leading-5 text-gray-300 hover:border-gray-600 hover:text-gray-200 hover:shadow-sm focus:ring focus:ring-gray-600/40 active:border-gray-700 active:shadow-none">
                <svg
                  className="hi-mini hi-user-circle inline-block size-5 sm:hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:inline">{username}</span>
                <svg
                  className="hi-mini hi-chevron-down hidden size-5 opacity-40 sm:inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </MenuButton>
              {/* END Dropdown Toggle Button */}

              {/* Dropdown */}
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-90"
              >
                <MenuItems
                  modal={false}
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg shadow-xl focus:outline-none dark:shadow-gray-900"
                >
                  <div className="divide-y divide-gray-100 rounded-lg bg-white ring-1 ring-black/5 dark:divide-gray-700 dark:bg-gray-800 dark:ring-gray-700">
                    <div className="space-y-1 p-2.5">
                      {/* eslint-disable-next-line */}
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            onClick={onClickAccount}
                            className={`group flex items-center justify-between gap-2 rounded-lg border border-transparent px-2.5 py-2 text-sm font-medium ${
                              focus
                                ? "bg-blue-50 text-blue-800 dark:border-transparent dark:bg-gray-700/75 dark:text-white"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-800 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700/75 dark:hover:text-white dark:active:border-gray-600"
                            }`}
                          >
                            <svg
                              className="hi-mini hi-user-circle inline-block size-5 flex-none opacity-25 group-hover:opacity-50"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="grow">Account</span>
                          </button>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            onClick={onClickSettings}
                            className={`group flex items-center justify-between gap-2 rounded-lg border border-transparent px-2.5 py-2 text-sm font-medium ${
                              focus
                                ? "bg-blue-50 text-blue-800 dark:border-transparent dark:bg-gray-700/75 dark:text-white"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-800 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700/75 dark:hover:text-white dark:active:border-gray-600"
                            }`}
                          >
                            <svg
                              className="hi-mini hi-cog-6-tooth inline-block size-5 flex-none opacity-25 group-hover:opacity-50"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="grow">Settings</span>
                          </button>
                        )}
                      </MenuItem>
                    </div>
                    <div className="space-y-1 p-2.5">
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            onClick={onClickSignOut}
                            className={`group flex items-center justify-between gap-2 rounded-lg border border-transparent px-2.5 py-2 text-sm font-medium ${
                              focus
                                ? "bg-blue-50 text-blue-800 dark:border-transparent dark:bg-gray-700/75 dark:text-white"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-800 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700/75 dark:hover:text-white dark:active:border-gray-600"
                            }`}
                          >
                            <svg
                              className="hi-mini hi-lock-closed inline-block size-5 flex-none opacity-25 group-hover:opacity-50"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="grow">Sign out</span>
                          </button>
                        )}
                      </MenuItem>
                    </div>
                  </div>
                </MenuItems>
              </Transition>
              {/* END Dropdown */}
            </Menu>
            {/* END User Dropdown */}

            {/* Toggle Mobile Navigation */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-semibold leading-5 text-gray-300 hover:border-gray-600 hover:text-gray-200 hover:shadow-sm focus:ring focus:ring-gray-600/40 active:border-gray-700 active:shadow-none"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="hi-solid hi-menu inline-block size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {/* END Toggle Mobile Navigation */}
          </div>
          {/* END Right Section */}
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden ${mobileNavOpen ? "" : "hidden"}`}>
          <nav className="flex flex-col gap-2 border-t border-gray-700 py-4">
            {isGuest && (
              <button
                onClick={onClickSignupFromGuest}
                className="flex items-center justify-center gap-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors duration-200"
              >
                Signup Here
              </button>
            )}
            {links.map((link) => (
              <Link
                to={link.href}
                className="group flex items-center gap-2 rounded-lg border border-transparent bg-gray-700/75 px-3 py-2 text-sm font-semibold text-white"
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        {/* END Mobile Navigation */}
      </div>
    </header>
  );
};

function Logo() {
  return (
    <span className="group inline-flex items-center gap-2 text-lg font-bold tracking-wide text-gray-100 hover:text-gray-300">
      <span>CoYD</span>
    </span>
  );
}
