export class ApiService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
