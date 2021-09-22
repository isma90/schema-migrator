export class Utils {
  public static parse(defaultValue: number, raw?: string,){
    if(raw){
      return isNaN(parseInt(raw))? defaultValue : parseInt(raw);
    }
    return defaultValue;
  }

  public static simpleStringify(object: any) {
    if (object && typeof object === 'object') {
      object = Utils.copyWithoutCircularReferences([object], object);
    }
    return JSON.stringify(object);
  }

  private static copyWithoutCircularReferences(references: any, object: any) {
    const cleanObject: any = {};
    Object.keys(object).forEach((key) => {
      const value: any = object[key];
      if (value && typeof value === 'object') {
        if (references.indexOf(value) < 0) {
          references.push(value);
          cleanObject[key] = Utils.copyWithoutCircularReferences(references, value);
          references.pop();
        } else {
          cleanObject[key] = '###_Circular_Reference_###';
        }
      } else if (typeof value !== 'function') {
        cleanObject[key] = value;
      }
    });
    return cleanObject;
  }
}