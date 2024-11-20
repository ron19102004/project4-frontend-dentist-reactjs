import useBoolean from '@/hooks/useBoolean.hook'
import { cn } from '@/lib/cn'
import React, { useEffect, useRef, useState } from 'react'
import assets from '@/assets'
import axios from 'axios'
import { useList } from '@/hooks'
import { Entity } from '@/apis/models'
import { LoopUtil } from '../utils'
import { ClassValue } from 'clsx'

interface Message extends Entity {
    text: string,
    isUser: boolean
}

const ChatBot: React.FC<{ className?: ClassValue }> = ({ className }) => {
    const [message, setMessage] = useState<string>('')
    const { value: valueOpenBox,
        autoChange: autoChangeStatusBox
    } = useBoolean()
    const [index, setIndex] = useState<number>(2)
    const messages = useList<Message>([{
        id: 1,
        text: 'Xin chào Quý khách. \nRất vui được gặp lại Quý khách. Chúng tôi có thể giúp được gì cho Quý khách ạ?',
        isUser: false
    }])

    const bottomMessageRef = useRef<HTMLDivElement | null>(null);

    const getId = (): number => {
        const indexCurrent = index
        setIndex(indexCurrent + 1)
        return indexCurrent
    }

 
    const onSubmitChat = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const messageCurrent = message;
        setMessage('');
        messages.add({
          id: getId(),
          text: messageCurrent,
          isUser: true,
        });
    
        try {
          // Gửi yêu cầu POST đến Flask backend
          const res = await axios.post('http://127.0.0.1:5000/chat', {
            message: messageCurrent,
          });
          console.log(res.data);
          // Kiểm tra xem có dữ liệu phản hồi hợp lệ không
          if (res.data && res.data.response) {
            messages.add({
              id: getId(),
              text: res.data.response,
              isUser: false,
            });
          } else {
            // Trường hợp không có phản hồi hợp lệ từ backend
            messages.add({
              id: getId(),
              text: 'Không có phản hồi từ AI.',
              isUser: false,
            });
          }
        } catch (error) {
          console.error('Lỗi khi gửi yêu cầu:', error);
          messages.add({
            id: getId(),
            text: 'Đã xảy ra lỗi khi gửi tin nhắn.',
            isUser: false,
          });
        }
      };
    useEffect(() => {
        bottomMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.list]);
    return (
        <section className={cn(className)}>
            <div className={cn(
                {
                    'hidden': valueOpenBox,
                }
            )}>
                <button className={cn('flex flex-col justify-center items-center text-my_color_primary')} onClick={autoChangeStatusBox}>
                    {/* <i className="fa-solid fa-comment text-3xl"></i> */}
                    <img src={assets.MessageIcon} alt="message" className='w-12 h-12 md:w-14 md:h-14 rounded-full p-2 shadow border bg-white' />
                </button>
            </div>
            <div className={cn('bottom-0 bg-white border shadow-md w-80 p-2 rounded', {
                'hidden': !valueOpenBox
            })}>
                <div className='flex justify-between items-center font-semibold text-lg text-gray-700'>
                    <div className='flex justify-start items-center gap-1'>
                        <div>
                            <img src={assets.BotIcon} alt="boticon" className='w-8' />
                        </div>
                        <h1>Trợ lý tư vấn</h1>
                    </div>
                    <button onClick={autoChangeStatusBox}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <hr />
                <div className='py-2'>
                    <ul className='scroll-y-custom bg-white py-2 rounded-lg p-2 max-h-96 min-h-96 overflow-y-auto space-y-2'>
                        <LoopUtil
                            data={messages.list}
                            render={(item: Message) =>
                                <li className={cn(' flex flex-col p-2 rounded-lg', {
                                    'bg-my_color_bg_secondary ml-10 font-semibold': item.isUser,
                                    'bg-my_color_primary mr-10 text-white': !item.isUser,
                                })}>
                                    {item.text}
                                </li>
                            }
                        />
                        <div ref={bottomMessageRef} />
                    </ul>
                </div>
                <hr />
                <form onSubmit={onSubmitChat}>
                    <input type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={cn('w-full outline-none rounded px-2 py-1 border-0')}
                        placeholder='Tin nhắn'
                        required
                    />
                </form>
            </div>
        </section>
    )
}

export default ChatBot
