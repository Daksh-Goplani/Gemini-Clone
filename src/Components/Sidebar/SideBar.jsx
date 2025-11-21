import React, { useContext, useState } from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const SideBar = () => {

    const [extended, setExtended] = useState(false)
    const { onSent, previousPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    return (
        <div className='sidebar'>
            <div className="top">
                <img className='menu' src={assets.menu_icon} alt="" onClick={() => setExtended(prev => !prev)} />

                <div onClick={newChat} className="newChat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>

                {extended ?
                    <div className="recent">
                        <p className="recentTitle">Recent</p>

                        {previousPrompts.map((item, index) => (
                            <div key={index} onClick={() => loadPrompt(item)} className="recentEntry">
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0, 18)}...</p>
                            </div>
                        ))}

                    </div>
                    : null
                }
            </div>

            <div className="bottom">
                <div className="bottomItem recentEntry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottomItem recentEntry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottomItem recentEntry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default SideBar
