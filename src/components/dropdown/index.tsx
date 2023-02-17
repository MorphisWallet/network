import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import cl from "classnames";

type DropdownProps = {
  renderButton?: () => React.ReactNode | React.ReactNode[];
  children?: React.ReactNode | React.ReactNode[];
};

const Dropdown = ({ renderButton, children }: DropdownProps) => (
  <Menu as="div" className="relative inline-block text-left">
    <div>
      <Menu.Button
        className={cl([
          "w-full inline-flex justify-center items-center h-[54px] min-w-[160px] max-w-[240px]",
          "rounded-[28px] bg-black text-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition",
          "hover:bg-[#2a2a2d]",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100",
        ])}
      >
        {renderButton?.() || null}
      </Menu.Button>
    </div>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      {children}
    </Transition>
  </Menu>
);

Dropdown.Items = Menu.Items;
Dropdown.Item = Menu.Item;

export default Dropdown;