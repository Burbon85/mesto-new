export default class UserInfo {
    constructor({profileName, profileJob}) {
        this._profileName = profileName;
        this._profileJob = profileJob;
    }

    getUserInfo() {
        this._InfoProfile = {};
        this._InfoProfile.title =  this._profileName.textContent;
        this._InfoProfile.subtitle = this._profileJob.textContent;
        return this._InfoProfile;
    }

    setUserInfo(data) {
        this._profileName.textContent = data.title
        this._profileJob.textContent = data.subtitle
    }

}