export interface IHttpClientRequestParameters<T> {
    endPoint: string
    requiresToken: boolean
    payload?: T
}