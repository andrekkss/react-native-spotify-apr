export default interface IHttpClientRequestParameters<T = undefined> {
    endPoint: string
    payload?: T
}