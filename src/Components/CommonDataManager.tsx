export default class CommonDataManager {
  static myInstance = null;

  _audioData = '';

  /**
   * @returns {CommonDataManager}
   */
  static getInstance() {
    if (CommonDataManager.myInstance == null) {
      CommonDataManager.myInstance = new CommonDataManager();
    }

    return this.myInstance;
  }

  getAudioPlayer() {
    return this._audioData;
  }

  setAudioPlayer(data: any) {
    this._audioData = data;
  }
}
