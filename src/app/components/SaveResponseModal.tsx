import { Dialog } from "@headlessui/react";
import { SaveResponseModalProps } from "../../../types";

export default function SaveResponseModal(props: SaveResponseModalProps) {
    const { isSaveResponseModalOpen, setIsSaveResponseModalOpen, saveResponseMessage } = props;
    return(
        <Dialog as='div' open={isSaveResponseModalOpen} onClose={() => {setIsSaveResponseModalOpen(false)}}>
            {/* backdrop */}
            <div className='fixed inset-0 bg-slate-400 bg-opacity-60 bg-blur-50 backdrop-blur-sm' aria-hidden='true'/>
            {/* fullscreen container - used for positioning */}
            <div className='flex flex-col items-center justify-center z-10 overflow-y-auto'>
                <Dialog.Panel
                    className='flex align-center justify-center border dark:border-white fixed inset-x-90 inset-y-60 flex items-center justify-center w-full max-w-md py-6 px-10 transform overflow-hidden rounded-2xl bg-white bg-opacity-10 shadow-xl border dark:bg-opacity-90 dark:bg-slate-700 dark:border-white'
                    >
                    <Dialog.Title className='flex align-center text-xl font-bold dark:text-white'>
                        <span>{saveResponseMessage}</span>
                    </Dialog.Title>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}