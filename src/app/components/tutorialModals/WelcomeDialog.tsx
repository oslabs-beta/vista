import React, { Dispatch, SetStateAction, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface WelcomeDialogProps {
  welcomeDialog: boolean | undefined
  setWelcomeDialog: Dispatch<SetStateAction<boolean>>
  setApiEndpointDialog: Dispatch<SetStateAction<boolean>>
}

export default function WelcomeDialog({
  welcomeDialog,
  setWelcomeDialog,
  setApiEndpointDialog,
}: WelcomeDialogProps) {
  const closeModal = () => {
    setWelcomeDialog(true)
    setApiEndpointDialog(true)
  }

  return (
    // TODO: CONFIGURE TRANSITION
    <Transition
      show={!welcomeDialog}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog onClose={() => {}}>
        {/* backdrop */}
        {/* <div className='fixed inset-0 bg-slate-400 bg-opacity-60 bg-blur-50 backdrop-blur-sm' aria-hidden='true'/> */}
        {/* fullscreen container - used for positioning */}
        <div className="flex flex-col items-center justify-center z-10 overflow-y-auto">
          <Dialog.Panel className="flex flex-col items-center justify-center border dark:border-white fixed inset-x-90 inset-y-60 w-full max-w-md py-6 px-10 transform overflow-hidden rounded-2xl bg-white bg-opacity-10 shadow-xl dark:bg-opacity-90 dark:bg-slate-700 shadow-xs shadow-secondary">
            <Dialog.Title className="flex align-center text-3xl font-bold dark:text-white">
              Welcome to Vista!
            </Dialog.Title>
            <p className="text-l dark:text-white flex align-center m-6 w-full text-xl text-center">
              Looks like you&apos;re new, let&apos;s show you how to use this
              GraphQL schema visualizer tool!
            </p>
            <div className="w-full flex flex-row content-evenly justify-evenly">
              <button
                className="ml-1 bg-blue-500 dark:bg-slate-500 text-white px-3 py-1 rounded-xl my-1 inline-flex dark:border dark:border-white dark:hover:bg-slate-300 dark:hover:text-slate-900"
                onClick={closeModal}
              >
                Confirm
              </button>

              <button
                className="ml-1 bg-blue-500 dark:bg-slate-500 text-white px-3 py-1 rounded-xl my-1 inline-flex dark:border dark:border-white dark:hover:bg-slate-300 dark:hover:text-slate-900"
                onClick={() => setWelcomeDialog(true)}
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  )
}
