import Cookies from "js-cookie";

export const expiryTokenData = (userToken:string) => {
    const token = userToken;
    const currentTime = new Date();
    const futureTime:any = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000)
    Cookies.set('authToken', token);
    Cookies.set('tokenExpiry', futureTime);
}