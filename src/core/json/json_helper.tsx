class JsonHelper {
    static getObjectFromJsonString<T> (json: string): T {
        const result: T = JSON.parse(json)
        return result
    }

    static toJsonString<T> (object: T){
        return JSON.stringify(object)
    }
}
