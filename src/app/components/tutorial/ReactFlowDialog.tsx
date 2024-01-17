import React, { Dispatch, SetStateAction } from 'react';
import { Dialog } from '@headlessui/react';

interface ReactFlowDialogProps {
    reactFlowDialog: boolean | undefined,
    setReactFlowDialog: Dispatch<SetStateAction<boolean>>
}


export default function ReactFlowDialog({reactFlowDialog, setReactFlowDialog}: ReactFlowDialogProps) {

    const closeModal = () => {
        setReactFlowDialog(false);
    }

    return ( 
        <Dialog as='div' open={reactFlowDialog} onClose={() => {}} >
            {/* backdrop */}
            {/* fullscreen container - used for positioning */}
            <div className='pl-4'>
            <Dialog.Panel
                        className='flex flex-col items-center justify-center border dark:border-white fixed inset-x-90 inset-y-60 max-w-md h-48 px-10 overflow-hidden rounded-2xl bg-white bg-opacity-10 shadow-xl dark:bg-opacity-90 dark:bg-slate-700 shadow-xs shadow-secondary'
                        >
                        <Dialog.Title className='flex align-center text-2xl font-bold dark:text-white'>
                            Here is your schema!
                        </Dialog.Title>
                        <p
                            className='text-l dark:text-white flex align-center m-6 w-full text-l text-center'
                        >
                          These are the fields that you can query on your schema. Clicking on a node will show you what fields you can query for.
                        </p>
                        <div className='w-full flex flex-row content-evenly justify-evenly'>
                            <button 
                                className='ml-1 bg-blue-500 dark:bg-slate-500 text-white px-3 py-1 rounded-xl my-1 inline-flex dark:border dark:border-white dark:hover:bg-slate-300 dark:hover:text-slate-900'
                                onClick={closeModal}
                                >
                                    Confirm
                            </button>

                            <button 
                                className='ml-1 bg-blue-500 dark:bg-slate-500 text-white px-3 py-1 rounded-xl my-1 inline-flex dark:border dark:border-white dark:hover:bg-slate-300 dark:hover:text-slate-900' 
                                onClick={() => setReactFlowDialog(true)}
                                >
                                    Cancel
                            </button>
                        </div>
                    </Dialog.Panel>
            </div>
        </Dialog>
    );
}