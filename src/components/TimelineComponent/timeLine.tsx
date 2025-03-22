import { useState } from 'react';
import './timeLine.scss';

export const TimeLimeComponent = () => {
    const [showCreateNote, setshowCreateNote] = useState(false);
    const [createNote, setcreateNote] = useState({
        noteTitle: "",
        noteDescription: "",
        noteAttachment: ""
    })
    const showCreateNoteContent = () => {
        setshowCreateNote(!showCreateNote);
        setcreateNote({
            noteTitle: "",
            noteDescription: "",
            noteAttachment: "" 
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
    console.log(createNote);

    return (
        <>
            <div>
                <div className="searchTimeLineContent">
                    <div className="relative">
                        <input placeholder='Search your Timeline' type='text' className='textField py-1 rounded-1 pl-6 bg-gray-200 h-8' name='searchTimeline' />
                        <div className="absolute left-1 top-2">
                            <span className="material-symbols-outlined search_icon">search</span>
                        </div>
                    </div>
                    {showCreateNote ?
                        <div className='createNoteContent my-3'>
                            <div>
                                <input onChange={createContentData} placeholder='Title' className='textField py-1 rounded-1 px-2 bg-gray-100 h-8 mb-2' type='text' name="noteTitle" />
                            </div>
                            <div>
                                <textarea onChange={createContentData} placeholder='Description' className='textField py-1 rounded-1 px-2 bg-gray-100 h-20' name="noteDescription" />
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
                                    <button className='bg-indigo-400 px-1 py-1 mx-2 text-white rounded-1'>Save Note</button>
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
                </div>
            </div>
        </>
    )
}