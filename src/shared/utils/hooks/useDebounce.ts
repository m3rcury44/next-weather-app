export const useDebounce = (fn: (args: string) => void, delay: number) => {
    let timeout: NodeJS.Timeout

    return (args: string) => {
        clearTimeout(timeout)

        timeout = setTimeout(() => {
            fn(args)
        }, delay)
    }
}