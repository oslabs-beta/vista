import React, { ChangeEvent, MouseEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { Dialog } from '@headlessui/react';
import { SaveModalProps } from "../../types";

export default function SaveModal(props: SaveModalProps) {
    const { isSaveModalOpen,
            setIsSaveModalOpen,
            setIsSaveResponseModalOpen,
            setSaveResponseStatus,
            query,
            endpoint,
        } = props;
        
    const [queryName, setQueryName] = useState('');
    const { data: instance } = useSession();
    // console.log('this is the session from within the savemodal => ', instance);
    //@ts-ignore
    const userEmail: string | undefined | null = instance?.user.email;
    async function handleSaveQuery(e: FormEvent) {
        e.preventDefault();
        const queryData = {
            queryName,
            queryText: query,
            endpoint,
            userEmail
        }
        const res = await fetch('/api/queries', {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(queryData)
        })
        console.log('this is the response from posting query to DB => ', res);
        // const responseMessage = (res.ok) ? 'Query Saved Succesfully!' : 'Something Went Wrong'
        setSaveResponseStatus(res.ok);
        setIsSaveModalOpen(false);
        setIsSaveResponseModalOpen(true);
    };
    function handleQueryNameChange(e: ChangeEvent<HTMLInputElement>) {
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
                            {/* this is causing a warning because it renders a div inside a p, probably need to take a deeper look into headlessUI to solve it */}
                        </div>
                    </Dialog.Description>
                        <form
                            className="w-full flex-col justify-center align-center"
                            onSubmit={(e) => {handleSaveQuery(e)}}>
                            <div className='flex flex-col justify-center items-center'>
                                <input
                                    data-testid='saveQuery_queryName'
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
                                    data-testid='button_saveQuery_saveQueryButton'
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