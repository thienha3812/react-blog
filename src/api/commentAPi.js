import apiService from '../ultis/axios';



export async function doCreateComment({ message = '', name = '' }) {
    const response = await apiService({
        url: '/comment',
        data: { message, name },
        method: 'PUT'
    })
    return response
}