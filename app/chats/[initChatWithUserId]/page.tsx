import * as React from 'react';
import ChatWrapper from "@/app/component/chat/ChatWrapper";

interface Params {
    initChatWithUserId?: string;
}

interface Props {
    params: Params;
}
export default function Chat({ params }: Props) {
    const { initChatWithUserId }= params;

    return (
        <ChatWrapper initUserId={initChatWithUserId} />
    );
}
