import React, {useEffect, useImperativeHandle, useRef} from "react";
import useScript from "../hooks/useScript";
import {WEB_SDK_LEGACY_URL} from "../config";
import ApesterEvent from "./ApesterEvent";
import useCombinedRef from "../hooks/useCombinedRef";

export interface ApesterMediaWidgetProps {
    id?: string;
    height?: string;
    className?: string;
    results?: string;
    autoCloseOnFinish?: boolean;
    autoCloseTimeout?: number;
    'data-media-id': string;
    'data-token'?: string;
    'data-campaign-id'?: string;
    'data-auto-fullscreen'?: string;
    'data-manual-top'?: string;
    'data-manual-top-desktop'?: string;
    'data-manual-top-mobile'?: string;
    'external-id'?: string;
    sandboxMode?: boolean;
    'agencyData'?: {
        agencyName: string;
        agencyImage: string;
    }
}

interface WidgetHandle {
    reload: () => void;
    instance?: HTMLDivElement
}


const ApesterMediaWidget = React.forwardRef<WidgetHandle, ApesterMediaWidgetProps>((
    {
        className = '',
        agencyData,
        sandboxMode = false,
        autoCloseOnFinish = false,
        autoCloseTimeout = 300,
        ...props
    },
    ref
) => {
    const innerRef = useRef(null);
    const reloadApesterUnit = () => {
        // @ts-ignore
           if (window.APESTER) {
               // @ts-ignore
               window.APESTER.reload();
           }
    }
    useImperativeHandle(ref, () => ({
        reload: () => {
            reloadApesterUnit();
        }
    }));

    useEffect(() => {
        reloadApesterUnit();
    }, [
        props['data-media-id']
    ]);

    const combinedRef = useCombinedRef(ref, innerRef);
    const scriptStatus = useScript(WEB_SDK_LEGACY_URL);
    if (!props['data-media-id']) {
        throw new Error("'data-media-id' is mandatory prop.");
    }
    if (scriptStatus === 'ready') {
        return <>
            {
                autoCloseOnFinish === true &&
                <ApesterEvent callback={() => {
                    setTimeout(() => {
                        combinedRef?.current.querySelector('iframe').contentWindow.postMessage({type: 'fullscreen_off'}, '*');
                    }, autoCloseTimeout)
                }} type="last_slide_reached" />
            }
            {/*@ts-ignore*/}
            <div
                key={props['data-media-id']}
                ref={combinedRef as any}
                className={`apester-media ${className}`}
                sandbox-mode={`${sandboxMode}`}
                agency-data={agencyData ? JSON.stringify(agencyData) : undefined}
                {...props}
            />
        </>
    }
    return null;
});

export default ApesterMediaWidget;
