import Cookies from "js-cookie";

export const expiryTokenData = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const currentTime = new Date();
    const futureTime: any = new Date(currentTime.getTime() + 10 * 60 * 1000);
    Cookies.set('authToken', token,);
    Cookies.set('tokenExpiry', futureTime);
}