import React from 'react';
import { winiDate } from '@/shared/lib';
import { bgPatternUrl } from '@/shared/assets';
import {
  WiniBox,
  WiniIcon,
  WiniTypography,
} from '@/shared/ui/wini';

const conversationScrollbarStyle = {
  '&::-webkit-scrollbar': {
    width: '6px !important',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#bbb !important',
    borderRadius: '10px',
    border: '2px solid transparent',
    backgroundClip: 'padding-box',
    '&:hover': {
      background: 'linear-gradient(180deg, #3182f6 0%, #2870ed 100%)',
      borderRadius: '10px',
      border: '2px solid transparent',
      backgroundClip: 'padding-box',
    },
  },
};

const DEFAULT_CONNECTION_STATUS = {
  text: '연결됨',
  color: '#2A55A3',
  colorSub: '#9CC4FF',
  colorSub2: '#DCEAFF',
};

const DEFAULT_CHAT_MESSAGES = [
  {
    id: 'default-chat-1',
    speaker: 'SENDER',
    timestamp: '2026-06-09T10:12:00',
    text: '안녕하세요. 지금 채팅 테스트 중입니다.',
  },
  {
    id: 'default-chat-2',
    speaker: 'RECEIVER',
    timestamp: '2026-06-09T10:12:08',
    text: '확인했습니다. 메시지가 정상적으로 표시되고 있습니다.',
  },
  {
    id: 'default-chat-3',
    speaker: 'SENDER',
    timestamp: '2026-06-09T10:12:19',
    text: '좋습니다. 기본 대화 예시도 함께 보이도록 설정해둘게요.',
  },
  {
    id: 'default-chat-4',
    speaker: 'RECEIVER',
    timestamp: '2026-06-09T10:12:31',
    text: '네, 필요하면 호출부에서 다른 메시지 목록으로 바로 덮어쓸 수 있습니다.',
  },
];

const renderSenderMessage = (time, text, senderLabel) => (
  <WiniBox className={'flex gap-4 items-start'}>
    <WiniBox className={'p-2 bg-white rounded-full shadow-[0_4px_4px_rgba(24,50,75,0.1)]'}>
      <WiniIcon icon="dialog" className="w-[1.927vw] h-[1.927vw]" />
    </WiniBox>
    <WiniBox className={'min-w-0 max-w-[75%] mt-2'}>
      <WiniTypography variant="caption" className={'text-[0.72vw] font-bold text-text-dark'}>
        {senderLabel}
      </WiniTypography>
      <WiniBox className={'flex items-end gap-2'}>
        <WiniBox
          className={'relative bg-white rounded-[0_8px_8px_8px] py-3 px-4'}
          sx={{
            filter: 'drop-shadow(0 4px 4px rgba(24,50,75,0.1))',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-7px',
              width: '8px',
              height: '8px',
              backgroundColor: '#ffffff',
              clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
            },
          }}
        >
          <WiniTypography className={'break-words text-[0.64vw] font-semibold leading-[1.6] text-text-dark'}>
            {text}
          </WiniTypography>
        </WiniBox>
        <WiniTypography variant="caption" className={'text-text-default text-[0.5vw] font-medium shrink-0'}>
          {winiDate.dateFormat(time, 'HH:mm')}
        </WiniTypography>
      </WiniBox>
    </WiniBox>
  </WiniBox>
);

const renderReceiverMessage = (time, text, receiverLabel, showReceiverProfile) => (
  <WiniBox className={'flex gap-4 items-start flex-row-reverse'}>
    {showReceiverProfile ? (
      <WiniBox className={'p-2 rounded-full bg-[linear-gradient(135deg,#2A55A3_0%,#26778D_100%)] flex items-center justify-center shrink-0'}>
        <WiniIcon icon="counselor" className="w-[1.927vw] h-[1.927vw]" />
      </WiniBox>
    ) : null}
    <WiniBox className={`min-w-0 max-w-[75%] flex flex-col items-end mt-2 ${showReceiverProfile ? '' : 'mr-2'}`}>
      <WiniTypography variant="caption" className={'text-[0.72vw] font-bold text-[#10316D]'}>
        {receiverLabel}
      </WiniTypography>
      <WiniBox className={'flex items-end gap-2 flex-row-reverse'}>
        <WiniBox
          className={'relative bg-[linear-gradient(135deg,#2A55A3_0%,#26778D_100%)] rounded-[8px_0_8px_8px] py-3 px-4'}
          sx={{
            filter: 'drop-shadow(0 4px 4px rgba(24,50,75,0.1))',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: '-7px',
              width: '8px',
              height: '8px',
              background: 'linear-gradient(45deg, #26778D 0%, #26778D 100%)',
              clipPath: 'polygon(0 0, 100% 0, 0 100%)',
            },
          }}
        >
          <WiniTypography className={'break-words text-[0.64vw] font-semibold leading-[1.6] text-white'}>
            {text}
          </WiniTypography>
        </WiniBox>
        <WiniTypography variant="caption" className={'text-text-default text-[0.5vw] font-medium shrink-0'}>
          {winiDate.dateFormat(time, 'HH:mm')}
        </WiniTypography>
      </WiniBox>
    </WiniBox>
  </WiniBox>
);

export const WiniChat = ({
  connectionStatus = DEFAULT_CONNECTION_STATUS,
  chatMessages = DEFAULT_CHAT_MESSAGES,
  messagesEndRef,
  className = '',
  sx = {},
  style = {},
  title = '채팅',
  emptyTitle = '대화 대기 중',
  emptyDescription = '연결되면 대화 내용이 표시됩니다.',
  senderLabel = '송신자',
  receiverLabel = '수신자',
  showReceiverProfile = false,
  height = '50rem',
  minHeight,
}) => {
  const rootClassName = [
    'flex min-h-0 min-w-0 flex-col overflow-hidden bg-cover rounded-lg px-4 py-3',
    className,
  ].filter(Boolean).join(' ');
  const hasChatMessages = Array.isArray(chatMessages) && chatMessages.length > 0;
  const conversationRef = React.useRef(null);
  const internalMessagesEndRef = React.useRef(null);
  const shouldAutoScrollRef = React.useRef(true);
  const lastMessage = hasChatMessages ? chatMessages[chatMessages.length - 1] : null;
  const scrollSignal = hasChatMessages
    ? `${chatMessages.length}:${lastMessage?.id ?? ''}:${lastMessage?.text?.length ?? 0}`
    : '';

  const updateAutoScrollState = React.useCallback(() => {
    const conversation = conversationRef.current;
    if (!conversation) return;

    const bottomDistance = conversation.scrollHeight - conversation.scrollTop - conversation.clientHeight;
    shouldAutoScrollRef.current = bottomDistance <= 24;
  }, []);

  const containerSizeStyle = height
    ? { height, maxHeight: height, minHeight: height }
    : minHeight
      ? { minHeight }
      : {};

  // 자동 스크롤 처리
  React.useLayoutEffect(() => {
    if (!hasChatMessages || !shouldAutoScrollRef.current) return;

    const scrollToBottom = () => {
      if (conversationRef.current) {
        conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
      }
      internalMessagesEndRef.current?.scrollIntoView({ block: 'end' });
    };
    scrollToBottom();
    const frameId = window.requestAnimationFrame(scrollToBottom);

    return () => window.cancelAnimationFrame(frameId);
  }, [hasChatMessages, scrollSignal]);

  const setMessagesEndRef = React.useCallback((node) => {
    internalMessagesEndRef.current = node;

    if (!messagesEndRef) {
      return;
    }

    if (typeof messagesEndRef === 'function') {
      messagesEndRef(node);
      return;
    }

    messagesEndRef.current = node;
  }, [messagesEndRef]);

  return (
    <WiniBox
      ui="noAutoGap"
      className={rootClassName}
      sx={{ ...conversationScrollbarStyle, ...containerSizeStyle, ...sx }}
      style={{ backgroundImage: `url(${bgPatternUrl})`, ...style }}
    >
      <WiniBox className={'flex items-center justify-between shrink-0'}>
        <WiniBox className={'flex items-flex-end'}>
          <WiniIcon icon="titleCall" className="w-[1.25vw] h-[1.25vw] mr-2 text-[#00407f] fill-[#00407f]" />
          <WiniTypography className={'font-bold text-[#0F316D] text-[0.82vw]'}>
            {title}
          </WiniTypography>
        </WiniBox>
        <WiniBox className={'flex items-center gap-2 mt-0'}>
          <WiniBox
            className={'flex items-center gap-1 px-2 py-1 rounded-md'}
            sx={{
              '&::before': {
                content: '""',
                width: '0.625vw',
                height: '0.625vw',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${connectionStatus.colorSub} 0%, ${connectionStatus.colorSub2} 100%)`,
                border: `1px solid ${connectionStatus.color}`,
              },
            }}
          >
            <WiniTypography className="font-semibold text-[0.7vw] leading-0" style={{ color: connectionStatus.color }}>
              {connectionStatus.text}
            </WiniTypography>
          </WiniBox>
        </WiniBox>
      </WiniBox>

      <WiniBox
        ref={conversationRef}
        onScroll={updateAutoScrollState}
        className={hasChatMessages
          ? 'flex-1 min-h-0 my-1 overflow-y-auto pr-[0.3125vw] scrollbar'
          : 'flex-1 min-h-0 my-1 overflow-hidden'}
        sx={{ ...conversationScrollbarStyle }}
      >
          {!hasChatMessages ? (
          <WiniBox className={'flex flex-col items-center justify-center h-full gap-2.5'}>
            <WiniBox className={'w-[2.569vw] h-[2.569vw] rounded-full bg-[#f0f4ff] flex items-center justify-center mb-1'}>
              <WiniTypography className={'text-[0.96vw]'}>💬</WiniTypography>
            </WiniBox>
            <WiniTypography className={'text-[0.8vw] text-gray-900 font-semibold leading-none tracking-tight mb-0.5'}>
              {emptyTitle}
            </WiniTypography>
            <WiniTypography className={'text-[0.62vw] text-[#8b95a1] font-normal leading-none tracking-tight mb-1 mt-1'}>
              {emptyDescription}
            </WiniTypography>
          </WiniBox>
        ) : (
          <>
            {chatMessages.map((message, index) => (
              <React.Fragment key={`msg-${message.id || index}`}>
                {message.speaker === 'SENDER' || message.speaker === 'CALLER'
                  ? renderSenderMessage(message.timestamp, message.text, senderLabel)
                  : renderReceiverMessage(message.timestamp, message.text, receiverLabel, showReceiverProfile)}
              </React.Fragment>
            ))}
          </>
        )}
        <WiniBox ref={setMessagesEndRef} />
      </WiniBox>
    </WiniBox>
  );
};