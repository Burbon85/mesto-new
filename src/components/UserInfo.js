export default class UserInfo {
    constructor({profileName, profileJob}) {
        this._profileName = profileName;
        this._profileJob = profileJob;
    }

    getUserInfo() {
        this._InfoProfile = {};
        this._InfoProfile.name =  this._profileName.textContent;
        this._InfoProfile.job = this._profileJob.textContent;
        return this._InfoProfile;
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name
        this._profileJob.textContent = data.info
    }

}