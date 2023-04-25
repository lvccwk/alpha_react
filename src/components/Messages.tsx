import './../../src/components/UiDesign/ChatroomContact.css'

export default function Messages({ messages, senderId, sender, receiver }: { messages: string[][], senderId: string, sender?: string, receiver?: string }) {
    return (
        <div className='container'>
            <div className="messageList">
                {messages.map((message, index) => (
                    <div key={index}>
                        <div className="">{
                            senderId === message[1] ? sender : receiver
                        } : </div>
                        <br></br>
                        <div className="">{message[0]}</div>
                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    );

}