import * as React from 'react';

interface Params {
    initChatWithUserId?: string | null;
}

interface Props {
    params: Params;
}
export default function Chat({ params }: Props) {
    const { initChatWithUserId } = params;

    return (
        <>
            Chats {initChatWithUserId}
        </>
    );
}
