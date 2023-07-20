import React, { ChangeEvent, MouseEvent, FormEvent, useState } from "react";
import { Dialog } from '@headlessui/react';

type SaveModalProps = {
    query: string,
    endpoint: string,
    isSaveModalOpen: boolean,
    setIsSaveModalOpen: (status: boolean) => void,
    setIsSaveResponseModalOpen: (status: boolean) => void,
    setSaveResponseMessage: (message: string) => void,
};

export default function SaveModal(props: SaveModalProps) {
    const { isSaveModalOpen, 
            setIsSaveModalOpen, 
            setIsSaveResponseModalOpen, 
            setSaveResponseMessage, 
            query, 
            endpoint, 
        } = props;

    const [queryName, setQueryName] = useState('');
    async function handleSaveQuery(e: FormEvent) {
        e.preventDefault();
        const queryData = {
            queryName,
            queryText: query,
            endpoint,
        }
        const res = await fetch('http://localhost:3000/api/queries', {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(queryData)
        })
        console.log('this is the response from posting query to DB => ', res);
        // alert('Query saved to DB!');
        const responseMessage = (res.ok) ? 'Query Saved Succesfully!' : 'Failed to save query. Please try again.'
        setSaveResponseMessage(responseMessage);
        setIsSaveModalOpen(false);
        setIsSaveResponseModalOpen(true);
    };
    function handleQueryNameChange(e: ChangeEvent) {
        setQueryName(e.target.value); // TODO: don't understand why we're getting this error.
        console.log('this is e.target.value => ', e.target.value);
        console.log('queryName has been updated to: ', queryName);
    };
    function handleQueryChange(e: ChangeEvent) {
        // console.log(e.target.value);
        // setQuery(e.target.value);
        // console.log('query has been updated to: ', queryName);
    }
    return(
        <Dialog as='div' className='flex flex-row justify-center align-center z-50' open={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)}>
            {/* backdrop */}
            <div className='fixed inset-0 bg-slate-400 bg-opacity-60 bg-blur-50 backdrop-blur-sm' aria-hidden='true'/>
            {/* fullscreen container - used for positioning */}
            <div className='fixed inset-x-30 inset-y-20 flex items-center z-10 overflow-y-auto'>
                <Dialog.Panel
                    className='flex flex-col items-center w-full max-w-md py-6 px-10 transform overflow-hidden rounded-2xl bg-white bg-opacity-10 shadow-xl border dark:bg-opacity-90 dark:bg-slate-700 dark:border-white'>
                    <Dialog.Title className='m-5 text-xl font-bold dark:text-white'>
                        <span>Save Query</span>
                    </Dialog.Title>
                    <Dialog.Description>
                        <div className="dark:text-white">
                            <span>store this query so you can reference it later</span>
                        </div>
                    </Dialog.Description>
                        <form
                            className="w-full flex-col justify-center align-center"
                            onSubmit={(e) => {handleSaveQuery(e)}}>
                            <div className='flex flex-col justify-center items-center'>
                                <input
                                    type='text'
                                    placeholder=' enter query name'
                                    onChange={(e) => {handleQueryNameChange(e)}}
                                    required={true}
                                    className="h-8 mt-5 rounded-md border dark:bg-opacity-80 dark:bg-slate-800 dark:text-white dark:border-white"/>
                                <textarea
                                    onChange={(e) => {handleQueryChange(e)}}
                                    value={query}
                                    className='h-40 w-3/4 my-3 self-center rounded-xl border dark:bg-opacity-90 dark:bg-slate-800 dark:text-white dark:border-white'>
                                </textarea>
                            </div>
                            <div className='flex flex-row justify-center w-full'>
                                <button
                                    // onClick={(e) => {handleSaveQuery(e)}}
                                    type='submit'
                                    className='w-1/3 m-2.5 p-2 rounded-xl dark:bg-slate-500 dark:hover:bg-slate-300 dark:text-white dark:hover:text-slate-800'>Save</button>
                                <button
                                    onClick={() => {setIsSaveModalOpen(false)}}
                                    className='w-1/3 m-2.5 p-2 rounded-xl dark:bg-slate-500 dark:hover:bg-slate-300 dark:text-white dark:hover:text-slate-800'>Cancel</button>
                            </div>
                        </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
};