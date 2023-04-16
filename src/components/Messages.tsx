import './../../src/components/UiDesign/ChatroomContact.css'

export default function Messages({ messages, senderId, sender, receiver }: { messages: string[][], senderId: string, sender?: string, receiver?: string }) {
    console.log(messages)
    return (
        <div className='container'>
            <div className="messageList">
                {messages.map((message, index) => (
                    <div key={index}>
                        <div className="messageHeader">{
                            senderId === message[1] ? sender : receiver
                        } : </div>
                        <br></br>
                        <div className="textMessage">{message}</div>
                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    );

}