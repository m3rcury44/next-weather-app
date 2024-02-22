"use client"

import styles from './styles.module.scss'
import {
    ChangeEvent,
    MouseEvent,
    KeyboardEvent,
    FC,
    useCallback,
    useRef,
    useState,
} from "react";
import {SearchResult} from "@/components/search-result";
import {useEventListener} from "@/shared/utils/hooks/useEventListener";
import {useDebounce} from "@/shared/utils/hooks/useDebounce";
import {ICoordinate} from "@/shared/types";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

const Search: FC<{ updateCookies: (coordinates: string) => Promise<void> }> = ({updateCookies}) => {

    const [value, setValue] = useState('')
    const [debouncedValue, setDebouncedValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [index, setIndex] = useState(0)

    const searchRef = useRef<HTMLDivElement>(null)

    const {data: coordinates}: UseQueryResult<ICoordinate[], Error> = useQuery({
        queryKey: ['coordinates', debouncedValue],
        queryFn: async () => {
            if (debouncedValue) {
                const response = await fetch(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${debouncedValue}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`
                )
                return await response.json()
            }
            return []
        },
        staleTime: 1000 * 60}
    )

    const debouncedSearchUpdate = useCallback(useDebounce((args: string) => {
        if (index && coordinates && coordinates.length > 0) {
            setIndex(0)
        }

        setIsOpen(true)
        setDebouncedValue(args)
    }, 300), [index, coordinates])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        setValue(value)
        debouncedSearchUpdate(value)
    }

    const handleCloseSearchResults = () => {
        if (isOpen) {
            setIsOpen(false)
        }
        setValue('')
    }

    const updateCookiesData = (name: string, lat: number, lon: number, fn: () => void) => {
        setIsOpen(false)
        updateCookies(JSON.stringify({name: name, lat: lat, lon: lon})).then(r => r)
        fn()
    }

    const handlePreventDefault = (e: KeyboardEvent) => {
        if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
            e.preventDefault()
        }
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (!searchRef.current?.contains(e.target as Node)) {
            setIsOpen(false)
        }
    }

    useEventListener<MouseEvent>('click', handleClickOutside, isOpen)

    return (
        <search ref={searchRef} className={styles.search}>
            <input onKeyDown={handlePreventDefault} placeholder="Enter a city" type="text" value={value} onChange={handleChange}/>
            {value &&
                <div onClick={handleCloseSearchResults} className={styles.closeButton}>
                    <svg viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill="#fff"
                            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
                    </svg>
                </div>
            }
            {isOpen && debouncedValue && coordinates && coordinates.length > 0 ?
                <SearchResult
                    coordinates={coordinates}
                    isOpen={isOpen}
                    updateCookiesData={updateCookiesData}
                />
            : ''}
        </search>
    );
};

export default Search;