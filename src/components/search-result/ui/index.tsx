import styles from './styles.module.scss';
import {FC, KeyboardEvent, useState} from "react";
import {SearchResultItem} from "@/components/search-result-item";
import {ICoordinate} from "@/shared/types";
import {useEventListener} from "@/shared/utils/hooks/useEventListener";

interface ISearchResult {
    coordinates: ICoordinate[]
    updateCookiesData: (name: string, lat: number, lon: number, fn: () => void) => void
    isOpen: boolean
}

const SearchResult: FC<ISearchResult> = ({coordinates, isOpen, updateCookiesData}) => {

    const [index, setIndex] = useState(0)

    const handleSetHover = (index: number) => {
        setIndex(index)
    }

    const handleUpdateCookiesData = () => {
        updateCookiesData(
            coordinates[index].local_names?.en ? coordinates[index].local_names.en : coordinates[index].name,
            coordinates[index].lat,
            coordinates[index].lon,
            () => setIndex(0)
        )
    }

    const onEnter = (e: KeyboardEvent) => {
        if (e.code === 'Enter' && coordinates && isOpen) {
            handleUpdateCookiesData()
        }
    }

    const onArrowUp = (e: KeyboardEvent) => {
        if (e.code === 'ArrowUp' && isOpen && index > 0) {
            setIndex(prevState => prevState - 1)
        }
    }

    const onArrowDown = (e: KeyboardEvent) => {
        if (e.code === 'ArrowDown' && coordinates && index < coordinates?.length - 1) {
            setIndex(prevState => prevState + 1)
        }
    }

    useEventListener<KeyboardEvent>('keydown', onEnter)
    useEventListener<KeyboardEvent>('keydown', onArrowUp)
    useEventListener<KeyboardEvent>('keydown', onArrowDown)

    return (
        <div className={styles.searchResults}>
            <table>
                <thead>
                <tr>
                    <th>City</th>
                    <th>Country</th>
                    <th>Lat</th>
                    <th>Lon</th>
                </tr>
                </thead>
                <tbody>
                    {coordinates?.map((item, i) => (
                        <SearchResultItem
                            key={`${i}-${item.lat}`}
                            data-selected={index === i}
                            onClick={handleUpdateCookiesData}
                            item={item}
                            handleSetHover={() => handleSetHover(i)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SearchResult;