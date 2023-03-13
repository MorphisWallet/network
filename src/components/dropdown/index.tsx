import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import cl from 'classnames'

export type DropdownProps = {
  renderButton?: () => React.ReactNode | React.ReactNode[]
  buttonClassNames?: string
  children?: React.ReactNode | React.ReactNode[]
}

export const Dropdown = ({ renderButton, buttonClassNames, children }: DropdownProps) => (
  <Menu
    as="div"
    className="w-full max-w-full relative inline-block text-left"
  >
    {({ open }) => (
      <>
        <Menu.Button
          className={cl([
            'w-full h-9 inline-flex justify-center items-center',
            'rounded-[1.75rem] bg-black text-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm',
            'transition hover:bg-[#2a2a2d]',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100',
            open && 'rounded-b-none',
            buttonClassNames,
          ])}
        >
          {renderButton?.() || null}
          <i className={cl(['fa-solid fa-chevron-down ml-2 transition-transform', open && 'rotate-180'])} />
        </Menu.Button>
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
      </>
    )}
  </Menu>
)

Dropdown.Items = Menu.Items
Dropdown.Item = Menu.Item
