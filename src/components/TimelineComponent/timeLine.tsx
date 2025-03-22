import { useState } from 'react';
import './timeLine.scss';

export const TimeLimeComponent = () => {
    const [showCreateNote, setshowCreateNote] = useState(false);
    const [showRecentTimeLimesData, setshowRecentTimeLimesData] = useState<any>({
        showRecentTimeLimes: false,
        recentTimeLInes: []
    });
    const [createNote, setcreateNote] = useState({
        noteTitle: '',
        noteDescription: '',
        noteAttachment: '',
        createdNoteTime: ''
    })
    const showCreateNoteContent = () => {
        setshowCreateNote(!showCreateNote);
        setcreateNote({
            noteTitle: '',
            noteDescription: '',
            noteAttachment: '',
            createdNoteTime: ''
        })
    }
    const createContentData = (e: any) => {
        if (e.target.id === 'file-input') {
            setcreateNote({ ...createNote, noteAttachment: URL.createObjectURL(e.target.files[0]) })
            setshowCreateNote(true)
        } else {
            setcreateNote({ ...createNote, [e.target.name]: e.target.value })
        }
    }

    const getAddNoteTime = () => {
        const currentTime = new Date();
        let hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        return formattedTime;
    }

    const generateRandomId = () => {
        const timestamp = new Date().getTime();
        const randomId = 'id-' + timestamp + '-' + Math.floor(Math.random() * 1000000);
        return randomId;
    }

    const addTinelineNote = () => {
        const timeLineIcons = ['edit', 'keep', 'delete']
        const createdNoteData = { ...createNote, createdNoteTime: getAddNoteTime(), timeLineIcons, id: generateRandomId() }
        setshowRecentTimeLimesData({ ...showRecentTimeLimesData, recentTimeLInes: [...showRecentTimeLimesData.recentTimeLInes, createdNoteData], showRecentTimeLimes: true })
        setcreateNote({
            noteTitle: '',
            noteDescription: '',
            noteAttachment: '',
            createdNoteTime: ''
        })
    }

    const showRecentTimeLines = () => {
        setshowRecentTimeLimesData({ ...showRecentTimeLimesData, showRecentTimeLimes: !showRecentTimeLimesData.showRecentTimeLimes })
    }
    const actionTimeLine = (actionTimeItem: any, actionTimeIcon: string) => {
        const noteTimeLineItems = showRecentTimeLimesData.recentTimeLInes;
        const deleteNoteTimeLine = noteTimeLineItems.filter((item: { id: any; }) => item.id !== actionTimeItem.id);
        setshowRecentTimeLimesData({ ...showRecentTimeLimesData, recentTimeLInes: deleteNoteTimeLine })
        console.log(actionTimeItem)
    }
    return (
        <>
            <div>
                <div className="searchTimeLineContent">
                    <div className="relative">
                        <input placeholder='Search your Timeline' type='text' className='textField py-1 rounded-1 pl-6 bg-gray-200 h-8' name='searchTimeline' />
                        <div className="absolute left-1 top-2">
                            <span className="material-symbols-outlined icons_modify">search</span>
                        </div>
                    </div>
                    {showCreateNote ?
                        <div className='createNoteContent my-3'>
                            <div>
                                <input value={createNote.noteTitle} onChange={createContentData} placeholder='Title' className='textField py-1 rounded-1 px-2 bg-gray-100 h-8 mb-2' type='text' name="noteTitle" />
                            </div>
                            <div>
                                <textarea value={createNote.noteDescription} onChange={createContentData} placeholder='Description' className='textField py-1 rounded-1 px-2 bg-gray-100 h-20' name="noteDescription" />
                            </div>
                            <div className='flex items-center justify-between'>
                                {createNote.noteAttachment ?
                                    <div className='truncate w-25'>{createNote.noteAttachment}</div> :
                                    <div className="image-upload">
                                        <label htmlFor="file-input">
                                            <span className="material-symbols-outlined cursor-pointer">attach_file</span>
                                        </label>
                                        <input onChange={createContentData} name="noteAttachment" className='d-none' id="file-input" type="file" />
                                    </div>
                                }
                                <div>
                                    <button className='bg-indigo-400 px-1 py-1 mx-2 text-white rounded-1' onClick={addTinelineNote}>Save Note</button>
                                    <button className='bg-gray-500 px-1 py-1 mx-2 text-white rounded-1' onClick={showCreateNoteContent}>Cancel Note</button>
                                </div>
                            </div>
                        </div> :
                        <div className='enter_note my-3'>
                            <div className="flex items-center justify-between border-b-1 border-gray-200">
                                <div className='cursor-pointer' onClick={showCreateNoteContent}>
                                    <span className="material-symbols-outlined search_icon pr-2">edit</span><span>Enter Your Note...</span>
                                </div>
                                <div className="image-upload">
                                    <label htmlFor="file-input">
                                        <span className="material-symbols-outlined cursor-pointer">attach_file</span>
                                    </label>
                                    <input onChange={createContentData} className='d-none' id="file-input" type="file" />
                                </div>
                            </div>
                        </div>}

                    <div className='recentTimeLines'>
                        <div className='flex items-center justify-center' onClick={showRecentTimeLines}>
                            <span className="material-symbols-outlined">{showRecentTimeLimesData.showRecentTimeLimes ? "keyboard_arrow_down" : "keyboard_arrow_up"}</span> Recent <span className='w-100 mx-3'><hr /></span>
                        </div>
                        {showRecentTimeLimesData.showRecentTimeLimes && <div>
                            {showRecentTimeLimesData.recentTimeLInes.length ?
                                showRecentTimeLimesData.recentTimeLInes.map((item: any, index: any) => {
                                    return (<div key={index}>
                                        <div className='border rounded-1 p-2 m-1 relative'>
                                            <div>Modified on : {item.createdNoteTime}</div>
                                            <div className='absolute right-0 top-2 flex items-center justify-end'>
                                                {item.timeLineIcons.map((icon: any, iocnIndex: any) => {
                                                    return (
                                                        <div key={iocnIndex}>
                                                            <span className="material-symbols-outlined icons_modify mx-2 cursor-pointer" onClick={() => actionTimeLine(item, icon)}>{icon}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div>
                                                <div className='py-1'><strong>Note Modified by :<span className='mx-2'>Manohar</span></strong></div>
                                                <div className='py-1'>{item.noteTitle}</div>
                                                <div className='py-1'>{item.noteDescription}</div>
                                                <div className='py-1 truncate w-50'> <a href={item.noteAttachment} download="image.jpg"><button>{item.noteAttachment}</button></a></div>

                                            </div>
                                        </div>
                                    </div>)
                                })

                                : <div className='h-30 text-center flex items-center justify-center'>There are no time lines added Please Add</div>}
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}