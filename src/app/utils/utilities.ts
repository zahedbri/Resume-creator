export class Utilities {
    public static isEmpty(obj) {
        for(var key in obj) {
            if(obj[key] !== null) {
              return false;
            }
          }
          return true;
    };

    public static isStringEmpty(str) {
      return (!str || 0 === str.length);
    }
}