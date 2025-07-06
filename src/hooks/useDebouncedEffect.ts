import {useEffect, useRef} from "react"

export function useDebouncedEffect(
    effect: () => void,
    deps: any[],
    delay = 2000,
) {
    const isFirst = useRef(true)


    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false
            return
        }

        const handler = setTimeout(effect, delay)
        return () => clearTimeout(handler)
    }, [...deps, delay])
}
