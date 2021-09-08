import { get } from 'lodash';

const safeGet = (obj, path, defaultValue ) => {
  return get(obj, path, defaultValue ) || defaultValue ;
}

export default safeGet;