import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Menu, MenuButton, MenuItems, MenuItem, Transition } from "@headlessui/react";

import { ButtonDark } from "../Button";

interface NavbarProps {
  height: number;
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

const SignupButton: React.FC<{ onClick: () => void; className?: string }> = ({ onClick, className }) => (
  <button
    className={`items-center px-2.5 py-1.5 text-xs font-medium bg-white text-teal-700 hover:bg-teal-100 transition-colors duration-200 ${className}`}
    onClick={onClick}
  >
    Signup Here
  </button>
);

const DropdownMenuItem: React.FC<{ onClick: () => void; icon: React.ReactNode; label: string }> = ({
  onClick,
  icon,
  label,
}) => (
  <MenuItem>
    {({ focus }) => (
      <button
        onClick={onClick}
        className={`group flex items-center justify-between gap-2 px-2.5 py-2 text-sm font-medium ${
          focus ? "bg-teal-100 text-teal-800" : "text-gray-700 hover:bg-teal-50 hover:text-teal-800"
        }`}
      >
        {icon}
        <span className="grow">{label}</span>
      </button>
    )}
  </MenuItem>
);

export const VisualElement: React.FC<NavbarProps> = ({
  height,
  title,
  username,
  isGuest,
  links,
  onClickSignOut,
  onClickSettings,
  onClickAccount,
  onClickSignupFromGuest,
}) => {
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target as Node)) {
        setMobileNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      id="page-header"
      className="z-1 flex flex-none items-center bg-teal-500 shadow-sm"
      style={{ height: height + "px" }}
    >
      <div className="container mx-auto px-4 lg:px-8 xl:max-w-7xl">
        <div className="flex justify-between py-4">
          {/* Left Section */}
          <div className="flex items-center gap-2 lg:gap-6">
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-2 lg:flex">
              {links.map((link) => (
                <ButtonDark key={link.href} onClick={() => navigate(link.href)}>
                  <span>{link.label}</span>
                </ButtonDark>
              ))}
            </nav>
            {/* END Desktop Navigation */}
          </div>
          {/* END Left Section */}

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* User Dropdown */}
            {isGuest && <SignupButton onClick={onClickSignupFromGuest} className="hidden lg:inline-flex" />}
            <Menu as="div" className="relative inline-block gap-2">
              {/* Dropdown Toggle Button */}
              <MenuButton className="inline-flex items-center justify-center gap-2 bg-teal-600 px-3 py-2 text-sm font-semibold leading-5 text-white hover:bg-teal-700">
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
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right shadow-xl focus:outline-none"
                >
                  <div className="bg-white">
                    <div className="space-y-1 p-2.5">
                      <DropdownMenuItem
                        onClick={onClickAccount}
                        icon={
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
                        }
                        label="Account"
                      />
                      <DropdownMenuItem
                        onClick={onClickSettings}
                        icon={
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
                        }
                        label="Settings"
                      />
                    </div>
                    <div className="space-y-1 p-2.5">
                      <DropdownMenuItem
                        onClick={onClickSignOut}
                        icon={
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
                        }
                        label="Sign out"
                      />
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
                className="inline-flex items-center justify-center gap-2 bg-teal-600 px-3 py-2 text-sm font-semibold leading-5 text-white hover:bg-teal-700"
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
        <div ref={mobileNavRef} className={`lg:hidden ${mobileNavOpen ? "" : "hidden"}`}>
          {/* Absolute positioning */}
          <nav className="flex flex-col gap-2 py-4 bg-white w-full -mx-8 px-4 absolute top-0 left-0">
            {isGuest && <SignupButton onClick={onClickSignupFromGuest} className="flex justify-center" />}
            {links.map((link) => (
              <ButtonDark key={link.href} onClick={() => navigate(link.href)}>
                <span>{link.label}</span>
              </ButtonDark>
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
