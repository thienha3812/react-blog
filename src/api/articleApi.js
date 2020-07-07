import apiService from '../ultis/axios';



export async function doGetArticle({ category = '', limit = 6, index = 0 }) {
    const response = await apiService({
        url: `/article?index=${index}&limit=${limit}` ,
        method: 'GET',        
    })
    console.log(response.data)
    return response
}
export async function doGetArticleByID({id}){
    const response = await apiService({
        url : '/article/id/' + id,
        method :'GET'
    })
    return response;
}
export async function doGetPopularArticle(){
    const response = await apiService({
        url : '/article/popular',
        method : 'GET'
    })
    return response
}
