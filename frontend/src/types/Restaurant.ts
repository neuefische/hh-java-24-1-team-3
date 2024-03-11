export type Restaurant = {
    id: string,
    title: string,
    city: string,
    cuisine: string,
    address: RestaurantAddress
}

export type RestaurantAddress = {
    address: string,
    number: string
}