import {FC, HTMLAttributes} from "react";
import {ICoordinate} from "@/shared/types";

interface ISearchResultItem extends HTMLAttributes<HTMLElement> {
    item: ICoordinate
}

const SearchResultItem: FC<ISearchResultItem> = ({item, ...props}) => {
    return (
        <tr title={`${item.name} ${item.country} ${item.lat} ${item.lon}`} {...props}>
            <td>{item.name}</td>
            <td>{item.country}</td>
            <td>{+(item.lat.toFixed(3))}</td>
            <td>{+(item.lon.toFixed(3))}</td>
        </tr>
    );
};

export default SearchResultItem;