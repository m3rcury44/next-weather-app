import {FC, MouseEvent, HTMLAttributes, useRef} from "react";
import {ICoordinate} from "@/shared/types";
import {useEventListener} from "@/shared/utils/hooks/useEventListener";

interface ISearchResultItem extends HTMLAttributes<HTMLElement> {
    item: ICoordinate
    handleSetHover: () => void
}

const SearchResultItem: FC<ISearchResultItem> = ({item, handleSetHover, ...props}) => {

    const resultItemRef = useRef<HTMLTableRowElement>(null)

    const handleOnHover = (e: MouseEvent) => {
        if (resultItemRef.current?.contains(e.target as Node)) {
            handleSetHover()
        }
    }

    useEventListener<MouseEvent>('mousemove', handleOnHover)

    return (
        <tr title={`${item.name} ${item.country} ${item.lat} ${item.lon}`} ref={resultItemRef} {...props}>
            <td>{item.name}</td>
            <td>{item.country}</td>
            <td>{+(item.lat.toFixed(3))}</td>
            <td>{+(item.lon.toFixed(3))}</td>
        </tr>
    );
};

export default SearchResultItem;