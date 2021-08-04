import { environment } from "src/environments/environment";

export const createDBUrl = (path: string) => {
  return environment.firebaseDatabaseURL + path + '.json';
}
