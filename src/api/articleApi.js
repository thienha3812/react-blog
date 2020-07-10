import apiService from '../ultis/axios';



export async function doGetArticle({ category = '', limit = 6, index = 0 }) {
    const response = await apiService({
        url: `/article?index=${index}&limit=${limit}`,
        method: 'GET',
    })
    return response
}
export async function doGetArticleByID({ id }) {
    const response = await apiService({
        url: '/article/id/' + id,
        method: 'GET'
    })
    return response;
}
export async function doGetPopularArticle() {
    const response = await apiService({
        url: '/article/popular',
        method: 'GET'
    })
    return response
}
export async function doGetArticleByType({ index = 0, type }) {
    const response = await apiService({
        url: '/article/type?type=' + type + "&index=" + index,
        method: 'GET'
    })
    return response
}
