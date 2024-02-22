export interface ICoordinate {
    name: string
    local_names: {
        en: string
    }
    lat: number
    lon: number
    country: string
    state: string
}

export interface ICookiesData extends Pick<ICoordinate, 'name' | 'lat' | 'lon'> {
}