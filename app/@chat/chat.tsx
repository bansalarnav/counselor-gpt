'use client';

import Loader from '@/components/Loader';
import { Message, useChat } from 'ai/react';
import { useState } from 'react';

export default function Chat({ userAvatar, initialMsgs }: { userAvatar: string; initialMsgs: { role: string; content: string }[] }) {
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({ initialMessages: initialMsgs as Message[] });
  const [loading, setLoading] = useState(false);

  return (
    <div className='h-full w-full relative flex flex-col'>
      <div className='h-[calc(100%-80px)] overflow-y-scroll pr-2 flex flex-col-reverse'>
        {([...messages].reverse()).map(({ role, content }) => {
          return <ChatMessage avatar={role == 'user' ? userAvatar : '/aiavatar.png'} content={content} />
        })}
      </div>

      <div className='absolute bottom-0 flex w-full'>
        <form onSubmit={handleSubmit} className='w-full flex gap-[14px]'>
          <input className='w-full h-[50px] items-center justify-center border-none rounded-[6px] bg-[#ffffff20] outline-none p-5' placeholder='Ask a question...' value={input} onChange={handleInputChange} />
          <button disabled={loading} className='w-[50px] h-[48px] bg-[#ffffffee] rounded-[4px] flex items-center justify-center' type="submit">
            <SendIcon />
          </button>
        </form>
        <button disabled={loading} className='text-black ml-[12px] w-[50px] h-[48px] bg-[#ffffffee] rounded-[4px] flex items-center justify-center' onClick={async () => {
          setLoading(true);
          await fetch("/api/chat/clear", { method: "POST" });
          setMessages([])
          setLoading(false);
        }}>
          {loading ? <Loader color='#000' size={0.3} /> : 'Clear'}
        </button>
      </div>
    </div>
  );
}

const ChatMessage: React.FC<{ avatar: string; content: string }> = ({ avatar, content }) => {
  return (
    <div className='flex gap-[12px] my-4'>
      <img src={avatar} className='h-[30px] rounded-[6px]' />
      <p className='flex flex-col'>{content.split('\n').map(line => {
        return <span>{line}</span>
      })}</p>
    </div>
  )
}

const SendIcon = () => {
  return <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000" strokeWidth="1.5"><path fillRule="evenodd" clipRule="evenodd" d="M3.29106 3.3088C3.00745 3.18938 2.67967 3.25533 2.4643 3.47514C2.24894 3.69495 2.1897 4.02401 2.31488 4.30512L5.40752 11.25H13C13.4142 11.25 13.75 11.5858 13.75 12C13.75 12.4142 13.4142 12.75 13 12.75H5.40754L2.31488 19.6949C2.1897 19.976 2.24894 20.3051 2.4643 20.5249C2.67967 20.7447 3.00745 20.8107 3.29106 20.6912L22.2911 12.6913C22.5692 12.5742 22.75 12.3018 22.75 12C22.75 11.6983 22.5692 11.4259 22.2911 11.3088L3.29106 3.3088Z" fill="#000000"></path></svg>
}


