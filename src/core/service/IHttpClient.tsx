import type IHttpClientRequestParameters from './IHttpClientRequestParameters';

export default interface IHttpClient {
    get<T>(parameters: IHttpClientRequestParameters): Promise<T>
    post<T>(parameters: IHttpClientRequestParameters): Promise<T>
}