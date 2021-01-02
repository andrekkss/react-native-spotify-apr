import axios, { AxiosRequestConfig } from 'axios'
import type IHttpClientRequestParameters from './IHttpClientRequestParameters';
import type IHttpClient from './IHttpClient';
import SpotifyAPR from '../../module/index';

class HttpClient implements IHttpClient {
    baseUrl: string = "https://api.spotify.com/v1"

    get<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { endPoint } = parameters 

            SpotifyAPR.getToken()
                .then((token: string) => {
                    console.log(token);
                    axios.get(this.baseUrl+endPoint, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then((response: any) => {
                        resolve(response.data as T)
                    })
                    .catch((response: any) => {
                        reject(response)
                    })
                })
        })
    }

    post<T>(parameters: IHttpClientRequestParameters): Promise<T> { 
        return new Promise<T>((resolve, reject) => {
          const { endPoint, payload } = parameters
      
          SpotifyAPR.getToken()
                .then((token: string) => {
                    axios.post(this.baseUrl+endPoint, payload, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then((response: any) => {
                        resolve(response.data as T)
                    })
                    .catch((response: any) => {
                        reject(response)
                    })
                })
        })
    }

    put<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> { 
        return new Promise<T>((resolve, reject) => {
          const { endPoint, payload } = parameters
      
      
          SpotifyAPR.getToken()
                .then((token: string) => {
                    axios.put(this.baseUrl+endPoint, payload, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then((response: any) => {
                        resolve(response.data as T)
                    })
                    .catch((response: any) => {
                        reject(response)
                    })
                })
        })
    }
}

export default new HttpClient()