import React, { Dispatch, SetStateAction } from 'react';
import { Dialog } from '@headlessui/react';

interface ApiEndpointDialogProps {
    apiEndpointDialog: boolean | undefined,
    setApiEndpointDialog: Dispatch<SetStateAction<boolean>>
    setReactFlowDialog: Dispatch<SetStateAction<boolean>>
}


export default function ApiEndpointDialog({apiEndpointDialog, setApiEndpointDialog, setReactFlowDialog}: ApiEndpointDialogProps) {

    const closeModal = () => {
        setApiEndpointDialog(false);
        setReactFlowDialog(true);
    }

    return ( 
        <Dialog as='div' open={apiEndpointDialog} onClose={closeModal} >
            {/* backdrop */}
            <div className='fixed inset-0 bg-slate-400 bg-opacity-60 bg-blur-50 backdrop-blur-sm' aria-hidden='true'/>
            {/* fullscreen container - used for positioning */}
            <div className='flex flex-col items-center justify-center z-10 overflow-y-auto'>
                <Dialog.Panel
                    className='flex flex-col items-center justify-center border dark:border-white fixed inset-x-90 inset-y-60 w-full max-w-md py-6 px-10 transform overflow-hidden rounded-2xl bg-white bg-opacity-10 shadow-xl dark:bg-opacity-90 dark:bg-slate-700'
                    >
                    <Dialog.Title className='flex align-center text-xl font-bold dark:text-white'>
                        Api Endpoint Dialog
                    </Dialog.Title>
                    <Dialog.Description className='flex align-center text-md font-bold dark:text-white'>
                    </Dialog.Description>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}