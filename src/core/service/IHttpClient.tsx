import IHttpClientRequestParameters from './IHttpClientRequestParameters';

export interface IHttpClient {
    get<T>(parameters: IHttpClientRequestParameters): Promise<T>
    post<T>(parameters: IHttpClientRequestParameters): Promise<T>
}