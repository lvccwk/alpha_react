import React from "react";

export default function Messages({ messages }: { messages: string[] }) {
    return <div className="container">
        <div className="messageList">{

            messages.map((message, index) =>
                <div className='textMessage' key={index}>{message}</div>
            )
        }</div>
    </div>
}