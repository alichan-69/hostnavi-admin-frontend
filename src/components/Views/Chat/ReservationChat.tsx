import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, Avatar } from '@chatscope/chat-ui-kit-react';
import styles from './ReservationChat.module.scss';
import type { WebSocketReservationMessageResponseData } from '../../../type/responseData/reservationMessage';
import { useAuth } from '../../../hooks/auth';
import { dayJs } from '../../../utils/day';
import { CURRENT_DATE, MONTH_DAY_HOUR_MINUTE_TIME_FORMAT } from '../../../const/date';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import type { ReservationReservationResponseData } from '../../../type/responseData/reservationReservation';
import type { UserUserResponseData } from '../../../type/responseData/userUser';
import type { CompatClient } from '@stomp/stompjs';
import { getAllMessages } from '../../../utils/api/reservationMessage';
import { toast } from 'react-hot-toast';

const ReservationChat = function render({
  reservation,
  initialMessages,
}: {
  reservation: ReservationReservationResponseData | undefined;
  initialMessages: WebSocketReservationMessageResponseData[];
}) {
  const [stompClient, setStompClient] = useState<CompatClient>();
  const [sender, setSender] = useState<UserUserResponseData>();
  const [receiver, setReceiver] = useState<UserUserResponseData>();
  const [messages, setMessages] = useState<WebSocketReservationMessageResponseData[]>([]);
  const [loadingFlag, setLoadingFlag] = useState(false);

  const { userId } = useAuth();

  const sendMessage = (message: string) => {
    const messageParam = {
      event: 'send',
      reservationId: reservation?.id,
      senderId: sender?.id,
      receiverId: receiver?.id,
      message,
      sendTime: CURRENT_DATE,
    };

    stompClient?.send('/hostnavi-websocket', {}, JSON.stringify(messageParam));
  };

  useEffect(() => {
    // 初期表示メッセージをセット
    setMessages(initialMessages);

    // senderとreceiverのユーザー情報をセット
    if (userId === reservation?.inn.user.id) {
      setSender(reservation?.inn.user);
      setReceiver(reservation?.reserver);
    } else if (userId !== reservation?.inn.user.id) {
      setSender(reservation?.reserver);
      setReceiver(reservation?.inn.user);
    }

    const stompClientInitial = Stomp.over(new SockJS('http://localhost:8080/hostnavi-websocket'));
    // Stompのデバックモードをオフにすることで、コンソールへの出力をなくす処理
    stompClientInitial.debug = () => {
      return;
    };

    // WebSocketでの通信を開始
    stompClientInitial.connect({}, function () {
      // /messages/reservationIdを監視して、messageが返ってきたら最新のメッセージの一覧を取得する処理
      stompClientInitial.subscribe(`/messages/${reservation?.id}`, async (message) => {
        const messageJson = JSON.parse(message.body);

        if (messageJson.event === 'send') {
          setLoadingFlag(true);
          const messages = await getAllMessages(Number(reservation?.id)).catch(() => {
            toast.error('取得に失敗しました');
          });
          setLoadingFlag(false);
          setMessages(messages || []);
        }
      });
    });

    setStompClient(stompClientInitial);
  }, [reservation, initialMessages]);

  return (
    <MainContainer className="h-[600px]">
      <ChatContainer>
        <MessageList loadingMore={loadingFlag} loadingMorePosition="bottom">
          {messages.map((message) => (
            <Message
              key={`message-${message.id}`}
              className={styles['message']}
              model={{
                message: message.message,
                direction: message.senderId === sender?.id ? 'outgoing' : 'incoming',
                position: 'normal',
              }}
            >
              <Avatar src={message.senderId === sender?.id ? sender?.imageUrl : receiver?.imageUrl || ''} />
              <Message.Footer
                sender={message.senderId === sender?.id ? sender?.name : receiver?.name || ''}
                sentTime={dayJs(message.sendTime).format(MONTH_DAY_HOUR_MINUTE_TIME_FORMAT)}
              />
            </Message>
          ))}
        </MessageList>
        <MessageInput
          onSend={(message) => sendMessage(message)}
          className={styles['message-input']}
          placeholder="メッセージを入力してください"
          attachButton={false}
        />
      </ChatContainer>
    </MainContainer>
  );
};

export default ReservationChat;
