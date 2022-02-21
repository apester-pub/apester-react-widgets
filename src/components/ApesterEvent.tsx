import React, {useEffect, useCallback} from 'react';
import useScript from "../hooks/useScript";
import {WEB_SDK_LEGACY_URL} from "../config";

export interface MessageValues {
    type: 'picked_answer' | 'refresh_companion_ad' | 'finished_interaction' | 'last_slide_reached'
    data: {
        answerId: string
        answerText: string
        interactionId: string
        interactionIndex: number
        interactionTitle: string
        slideId: string
        slideTitle: string
    }
}

export interface ApesterEventProps {
    callback: (data: MessageValues['data'], type: MessageValues['type']) => void;
    type: MessageValues['type']
}

const ApesterEvent:React.FC<ApesterEventProps> = ({ callback, type }) => {
    const scriptStatus = useScript(WEB_SDK_LEGACY_URL);
    const eventCallback = useCallback(
(event: MessageEvent<MessageValues>) => {
          if (event && event.data && event.data.type === type)
              callback(event.data.data, type);
        },
        [type, callback],
    );

    useEffect(() => {
        if(scriptStatus === 'ready') {
            window.addEventListener('message', eventCallback);
        }

        return () => window.removeEventListener('message', eventCallback);
    }, [scriptStatus]);

    return null;
};

export default ApesterEvent;

