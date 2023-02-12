export default class APIBaseServices {
  constructor(http, url) {
    this._http = http
    this._url = url
  }

  get http() {
    return this._http
  }

  get url() {
    return this._url
  }
}
