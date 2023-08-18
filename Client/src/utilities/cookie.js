const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return '';
   }
   
   const deleteCookie = (name) => {
     const date = new Date();
     date.setTime(date.getTime() - 1);
     const expires = `expires=${date.toUTCString()}`;
     document.cookie = `${name}=;${expires};path=/`;
   }
   
   const saveCookie = (name, value, hours) => {
     const date = new Date();
     date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
     const expires = `expires=${date.toUTCString()}`;
     document.cookie = `${name}=${value};${expires};path=/`;
    }
   
   
   export {getCookie,deleteCookie,saveCookie}