'use client';

import { useEffect } from 'react';
import ConversationsList from './ConversationsList';
import CurrentConversation from './CurrentConversation';
import useMediaQuery from '../hooks/useMediaQuery';
import getUserConversationsandItemNames from '@/supabase/models/messaging/selectUserConversations';
import { useConversationContext } from '@/context/conversationContext';

type ConversationWrapperType = {
  userId: string;
};

const ConversationWrapper: React.FC<ConversationWrapperType> = ({ userId }) => {
  const isBreakpoint = useMediaQuery(1000);
  const {
    showConversationsList,
    setShowConversationsList,
    setAllConversations,
    setCurrentUserId,
  } = useConversationContext();

  useEffect(() => {
    const fetchConversations = async () => {
      const fetchedConversations =
        await getUserConversationsandItemNames(userId);

      setAllConversations(fetchedConversations);
      setCurrentUserId(userId);
    };
    fetchConversations();
  }, []);

  return (
    <div className='conversation-height w-full'>
      {isBreakpoint ? (
        <div className='flex h-full flex-col'>
          {showConversationsList ? (
            <ConversationsList />
          ) : (
            <div>
              <button
                className='self-start'
                onClick={() => setShowConversationsList(true)}
              >
                back
              </button>
              <CurrentConversation />
            </div>
          )}
        </div>
      ) : (
        <div className='p2 flex h-full flex-row justify-between'>
          <ConversationsList />
          <CurrentConversation />
        </div>
      )}
    </div>
  );
};

export default ConversationWrapper;
