
class SomeService {

  private _dataPromise: Promise<SomeService>

  private _data: SomeData

  loadInitialData() {
    if (this._dataPromise === undefined) {
      this._dataPromise = new Promise<SomeService>((resolve, reject) => {
        this.http.loadSomeDataFromServer().toPromise().then((data, error) => {
          this._data = data;
          resolve(this)
        })
      });
    }

    return this._dataPromise;
  }

  getData() {
    return this._data
  }

  addSomeData(data: SomeData) {
    this._data = data
    this.http.saveSomeDataToServer(this._data)
  }

}
