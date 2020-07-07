import apiService from '../ultis/axios';



export async function doGetTags(){
    const response = await apiService({
        url : '/tag',
        method : 'GET'
    })
    return response
}