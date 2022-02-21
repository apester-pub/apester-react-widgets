import React from "react";

const useCombinedRefs = (...refs: (React.MutableRefObject<any> | React.RefCallback<any> | React.ForwardedRef<any>)[]): React.MutableRefObject<any> => {
    const targetRef = React.useRef()

    React.useEffect(() => {
        refs.forEach(ref => {
            if (!ref) return

            if (typeof ref === 'function') {
                ref(targetRef.current)
            } else {
                ref.current = targetRef.current
            }
        })
    }, [refs])

    return targetRef
}

export default useCombinedRefs;
