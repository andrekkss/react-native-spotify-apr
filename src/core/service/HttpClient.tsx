import axios, { AxiosRequestConfig } from 'axios'
import IHttpClientRequestParameters from './IHttpClientRequestParameters';
import SpotifyAPR from '../../module/index';

class HttpClient implements IHttpClient {
    baseUrl: string = "https://api.spotify.com/v1"

    get<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { endPoint } = parameters 

            SpotifyAPR.getToken()
                .then((token: string) => {
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
          const { endPoint, payload, requiresToken } = parameters
      
          const options: AxiosRequestConfig = {
            headers: {}
          }
      
          if (requiresToken) {
            SpotifyAPR.getToken()
                .then((token: string) => {
                    options.headers['Authorization'] = `Bearer ${token}`
                })
          }
      
          axios
            .post(this.baseUrl+endPoint, payload, options)
            .then((response: any) => {
              resolve(response.data as T)
            })
            .catch((response: any) => {
              reject(response)
            })
        })
    }
}

export default new HttpClient()