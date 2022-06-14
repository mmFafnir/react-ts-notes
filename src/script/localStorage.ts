Storage.prototype.get = function(key: string) {
    const value = this.getItem(key)
    if(value) return JSON.parse(value);
    return null
    
  }

Storage.prototype.set = function(key: string, value: any) {
    return this.setItem(key, JSON.stringify(value))
}

export const getStorage = (key:string) => {
    return localStorage.get(key)
}
export const setStorage = (key: string, value: any) => {
    return localStorage.set(key, value)
}