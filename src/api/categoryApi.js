import apiService from '../ultis/axios';



export async function doGetCategories() {
    const response = await apiService({
        url: '/category',
        method: 'GET'
    })
    return response
}