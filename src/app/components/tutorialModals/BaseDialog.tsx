import React, { Dispatch, SetStateAction } from 'react';
import { parseSchemaAndFormat } from '@/utils/parseSchemaAndFormat';
import { Dialog } from '@headlessui/react';
import { BaseDialogProps } from '../../../../types';


export default function BaseDialog({title, description, getSchema, childToParent, openNextModalSetter, openCurrentModal, closeCurrentModalSetter}: BaseDialogProps) {

    const closeModal = async () => {
        if (openNextModalSetter) {
            openNextModalSetter(true)
        }

        closeCurrentModalSetter(false)

        if (getSchema && childToParent) {
            const schema = await parseSchemaAndFormat("https://rickandmortyapi.com/graphql")
            const schemaAndEndpoint = {schema: schema, endpoint: "https://rickandmortyapi.com/graphql"}
            childToParent(schemaAndEndpoint)
        }

    }

    return ( 
        <Dialog as='div' open={openCurrentModal} onClose={() => {}} >
            {/* backdrop */}
            {/* <div className='fixed inset-0 bg-slate-400 bg-opacity-60 bg-blur-50 backdrop-blur-sm' aria-hidden='true'/> */}
            {/* fullscreen container - used for positioning */}
            <div className='pl-4'>
            <Dialog.Panel
                        className='flex flex-col items-center justify-center border dark:border-white fixed inset-x-90 inset-y-60 max-w-md h-48 px-10 overflow-hidden rounded-2xl bg-white bg-opacity-10 shadow-xl dark:bg-opacity-90 dark:bg-slate-700 shadow-xs shadow-secondary'
                        >
                        <Dialog.Title className='flex align-center text-2xl font-bold dark:text-white'>
                            {title}
                        </Dialog.Title>
                        <p
                            className='text-l dark:text-white flex align-center m-6 w-full text-l text-center'
                        >
                           {description}
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
                                onClick={() => closeCurrentModalSetter(false)}
                                >
                                    Cancel
                            </button>
                        </div>
                    </Dialog.Panel>
            </div>
        </Dialog>
    );
}