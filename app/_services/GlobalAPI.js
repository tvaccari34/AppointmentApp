import { gql, request, GraphQLClient } from 'graphql-request';

const API_URL = 'https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/' + process.env.NEXT_PUBLIC_API_URL_PUBLIC_KEY + '/master';
const BOOKING_TOKEN = process.env.NEXT_PUBLIC_BOOKING_TOKEN;

const client = new GraphQLClient(API_URL, {
    headers: {
        'authorization': `Bearer ${BOOKING_TOKEN}`
    },
})

const getCategory = async () => {
    const query = gql`
    query GetCategories {
                categories {
                    bgcolor {
                    hex
                    }
                    id
                    icon {
                    url
                    }
                    name
                }
            }
    `

    const result = await client.request(query);
    return result;
}

const getAllBusinessList = async () => {
    const query = gql`
    query BusinessList {
            businessLists {
                id
                about
                address
                category {
                name
                }
                contactPerson
                email
                images {
                url
                id
                }
                name
            }
        }
    `

    const result = await client.request(query);
    return result;
}

const getBusinessByCategory = async (category) => {
    const query = `
    query BusinessList {
        businessLists(where: {category: {name: "`+ category + `"}}) {
            about
            address
            contactPerson
            email
            name
            id
            images {
            url
            }
            category {
            name
            }
        }
    }`

    const result = await client.request(query);
    return result;
}

const getBusinessById = async (id) => {
    const query = `query GetBusinessById {
            businessList(where: {id: "`+ id + `"}) {
                about
                address
                category {
                name
                }
                contactPerson
                email
                id
                name
                images {
                url
                }
            }
        }`

    const result = await client.request(query);
    return result;
}

const createNewBooking = async (businessId, date, time, userEmail, userName) => {
    const mutationQuery = gql`
        mutation CreateBooking {
            createBooking(
                data: {bookingStatus: booked, 
                    businessList: {connect: {id: "` + businessId + `"}}, 
                        date: "` + date + `", 
                        time: "` + time + `", 
                        userEmail: "` + userEmail + `", 
                        userName: "` + userName + `"}
            ) {
                id
            }
            publishManyBookingsConnection(to: PUBLISHED) {
                aggregate {
                count
                }
            }
        }`

    const result = await client.request(mutationQuery);
    return result;
}

const getBusinessBookingSlots = async (businessId, date) => {
    const query = gql`
    query getBusinessBookingSlots {
        bookings(where: {businessList: {id: "` + businessId + `"}, date: "` + date + `"}) {
            date
            time
        }
    }`

    const result = await client.request(query);
    return result;
}

const getUserBookingHistory = async (userEmail) => {
    const query = gql`
    query getUserBookingHistory {
        bookings(where: {userEmail: "` + userEmail + `"}, orderBy: date_ASC) {
            businessList {
            name
            images {
                url
            }
            contactPerson
            address
            }
            date
            time
        }
    }`

    const result = await client.request(query);
    return result;
}


export default {
    getCategory,
    getAllBusinessList,
    getBusinessByCategory,
    getBusinessById,
    createNewBooking,
    getBusinessBookingSlots,
    getUserBookingHistory
}
