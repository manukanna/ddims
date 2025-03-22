import { useState } from 'react';
import './timeLine.scss';
import { generateRandomId, getCurrentTimeAmPm } from '../common_Utilis/validationOfInputFields';

export const TimeLimeComponent = () => {
    const [showCreateNote, setshowCreateNote] = useState(false);
    const [showRecentTimelineNotesState, setshowRecentTimelineNotesState] = useState<any>({
        showRecentTimeLineNotes: false,
        showPinnedTimeLineNotes: false,
        recentTimeLineNotes: [],
        pinnedTimeLineNotes: []
    });
    const [createTimeLineNote, setcreateTimeLineNote] = useState({
        timeLineNoteTitle: '',
        timeLineNoteDescription: '',
        timeLineNoteAttachment: '',
        timeLineNotecreatedTime: '',
        pinnedTimeLineNote: false
    })
    const showCreateNoteContent = () => {
        setshowCreateNote(!showCreateNote);
        setcreateTimeLineNote({
            timeLineNoteTitle: '',
            timeLineNoteDescription: '',
            timeLineNoteAttachment: '',
            timeLineNotecreatedTime: '',
            pinnedTimeLineNote: false
        })
    }
    const createContentData = (e: any) => {
        if (e.target.id === 'file-input') {
            setcreateTimeLineNote({ ...createTimeLineNote, timeLineNoteAttachment: URL.createObjectURL(e.target.files[0]) })
            setshowCreateNote(true)
        } else {
            setcreateTimeLineNote({ ...createTimeLineNote, [e.target.name]: e.target.value })
        }
    }

    const addTinelineNote = () => {
        if (createTimeLineNote.timeLineNoteTitle !== '' && createTimeLineNote.timeLineNoteDescription !== '') {
            const timeLineIcons = ['edit', 'keep', 'delete']
            const createdNoteData = { ...createTimeLineNote, timeLineNotecreatedTime: getCurrentTimeAmPm(), timeLineIcons, id: generateRandomId() }
            setshowRecentTimelineNotesState({ ...showRecentTimelineNotesState, recentTimeLineNotes: [...showRecentTimelineNotesState.recentTimeLineNotes, createdNoteData], showRecentTimeLineNotes: true })
            setcreateTimeLineNote({
                timeLineNoteTitle: '',
                timeLineNoteDescription: '',
                timeLineNoteAttachment: '',
                timeLineNotecreatedTime: '',
                pinnedTimeLineNote: false
            })
            setshowCreateNote(false)
        }
    }

    const showRecentPinnedTimeLineNotes = (timeLineNoteShowHide: string) => {
        if (timeLineNoteShowHide === "pinned") {
            setshowRecentTimelineNotesState({ ...showRecentTimelineNotesState, showRecentTimeLineNotes: !showRecentTimelineNotesState.showRecentTimeLineNotes })
        } else {
            setshowRecentTimelineNotesState({ ...showRecentTimelineNotesState, showPinnedTimeLineNotes: !showRecentTimelineNotesState.showPinnedTimeLineNotes })
        }
    }
    const actionTimeLine = (actionTimeItem: any, actionTimeIcon: string) => {
        const noteTimeLineItems = showRecentTimelineNotesState.recentTimeLineNotes;
        if (actionTimeIcon === "delete") {
            const deleteNoteTimeLineNote = noteTimeLineItems.filter((item: { id: any; }) => item.id !== actionTimeItem.id);
            setshowRecentTimelineNotesState({ ...showRecentTimelineNotesState, recentTimeLineNotes: deleteNoteTimeLineNote })
        } else if (actionTimeIcon === "keep") {
            const [getPinnedNoteTimeLineNote] = noteTimeLineItems.filter((item: { id: any; }) => item.id === actionTimeItem.id);
            const changePinIconNote = { ...getPinnedNoteTimeLineNote, pinnedTimeLineNote: true }
            const getUnPinnedNoteTimeLineNote = noteTimeLineItems.filter((item: { id: any; }) => item.id !== actionTimeItem.id);
            setshowRecentTimelineNotesState({ ...showRecentTimelineNotesState, recentTimeLineNotes: getUnPinnedNoteTimeLineNote, pinnedTimeLineNotes: [...showRecentTimelineNotesState.pinnedTimeLineNotes, changePinIconNote], showPinnedTimeLineNotes: true })
        } else {
            const noteTimeLineItems = showRecentTimelineNotesState.pinnedTimeLineNotes;
            const [getUnPinnedNoteTimeLineNote] = noteTimeLineItems.filter((item: { id: any; }) => item.id === actionTimeItem.id);
            const changePinIconNote = { ...getUnPinnedNoteTimeLineNote, pinnedTimeLineNote: false }
            const getPinnedNoteTimeLineNotes = noteTimeLineItems.filter((item: { id: any; }) => item.id !== actionTimeItem.id);
            setshowRecentTimelineNotesState({ ...showRecentTimelineNotesState, recentTimeLineNotes: [...showRecentTimelineNotesState.recentTimeLineNotes, changePinIconNote], pinnedTimeLineNotes: getPinnedNoteTimeLineNotes })
        }
    }
    const getClickedDynamicPinnedIcon = (item: any, icon: any) => {
        return item.pinnedTimeLineNote && icon === 'keep' ? 'keep_public' : icon
    }

    const recentPinnedAddedTimeLineNotes = (timeLineNotes: string) => {
        return <>
            {showRecentTimelineNotesState[timeLineNotes].map((item: any, index: any) => {
                return (<div key={index}>
                    <div className='border rounded-1 p-2 m-1 relative'>
                        <div>Modified on : {item.timeLineNotecreatedTime}</div>
                        <div className='absolute right-0 top-2 flex items-center justify-end'>

                            {item.timeLineIcons.map((icon: any, iocnIndex: any) => {
                                return (
                                    <div key={iocnIndex}>
                                        <span className="material-symbols-outlined icons_modify mx-2 cursor-pointer" onClick={() => actionTimeLine(item, getClickedDynamicPinnedIcon(item, icon))}>{getClickedDynamicPinnedIcon(item, icon)}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            <div className='py-1'><strong>Note Modified by :<span className='mx-2'>Manohar</span></strong></div>
                            <div className='py-1'>{item.timeLineNoteTitle}</div>
                            <div className='py-1'>{item.timeLineNoteDescription}</div>
                            <div className='py-1 truncate w-50'> <a href={item.timeLineNoteAttachment} download="image.jpg"><button>{item.timeLineNoteAttachment}</button></a></div>

                        </div>
                    </div>
                </div>)
            })}
        </>
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
                                <input value={createTimeLineNote.timeLineNoteTitle} onChange={createContentData} placeholder='Title' className='textField py-1 rounded-1 px-2 bg-gray-100 h-8 mb-2' type='text' name="timeLineNoteTitle" />
                            </div>
                            <div>
                                <textarea value={createTimeLineNote.timeLineNoteDescription} onChange={createContentData} placeholder='Description' className='textField py-1 rounded-1 px-2 bg-gray-100 h-20' name="timeLineNoteDescription" />
                            </div>
                            <div className='flex items-center justify-between'>
                                {createTimeLineNote.timeLineNoteAttachment ?
                                    <div className='truncate w-25'>{createTimeLineNote.timeLineNoteAttachment}</div> :
                                    <div className="image-upload">
                                        <label htmlFor="file-input">
                                            <span className="material-symbols-outlined cursor-pointer icons_modify">attach_file</span>
                                        </label>
                                        <input onChange={createContentData} name="timeLineNoteAttachment" className='d-none' id="file-input" type="file" />
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
                                    <span className="material-symbols-outlined search_icon pr-2 icons_modify">edit</span><span>Enter Your Note...</span>
                                </div>
                                <div className="image-upload">
                                    <label htmlFor="file-input">
                                        <span className="material-symbols-outlined cursor-pointer icons_modify">attach_file</span>
                                    </label>
                                    <input onChange={createContentData} className='d-none' id="file-input" type="file" />
                                </div>
                            </div>
                        </div>}

                    <div className='recentTimeline'>
                        {showRecentTimelineNotesState.pinnedTimeLineNotes.length ?
                            <>
                                <div className='flex items-center justify-center' onClick={() => showRecentPinnedTimeLineNotes('recent')}>
                                    <span className="material-symbols-outlined">{showRecentTimelineNotesState.showPinnedTimeLineNotes ? "keyboard_arrow_down" : "keyboard_arrow_up"}</span> Pinned <span className='w-100 mx-3'><hr /></span>
                                </div>
                                <div>{showRecentTimelineNotesState.showPinnedTimeLineNotes ? recentPinnedAddedTimeLineNotes('pinnedTimeLineNotes') : ''}</div>
                            </> : ''}

                        {showRecentTimelineNotesState.recentTimeLineNotes.length ?
                            <>
                                <div className='flex items-center justify-center' onClick={() => showRecentPinnedTimeLineNotes('pinned')}>
                                    <span className="material-symbols-outlined">{showRecentTimelineNotesState.showRecentTimeLineNotes ? "keyboard_arrow_down" : "keyboard_arrow_up"}</span> Recent <span className='w-100 mx-3'><hr /></span>
                                </div>
                                <div>
                                    {showRecentTimelineNotesState.showRecentTimeLineNotes ? recentPinnedAddedTimeLineNotes('recentTimeLineNotes') : ''}
                                </div>
                            </>
                            : <div className='border-top h-30 text-center flex items-center justify-center'>There are no time line Note for you. Please Add</div>}

                    </div>
                </div>
            </div>
        </>
    )
}