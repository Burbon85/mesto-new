export default class UserInfo {
    constructor({profileName, profileJob}) {
        this._profileName = profileName;
        this._profileJob = profileJob;
    }

    getUserInfo() {
        this._infoProfile = {};
        this._infoProfile.name =  this._profileName.textContent;
        this._infoProfile.job = this._profileJob.textContent;
        return this._infoProfile;
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name
        this._profileJob.textContent = data.info
    }

}