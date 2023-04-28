export default class UserInfo {
    constructor({profileName, profileJob, profileAvatar}) {
        this._profileName = profileName;
        this._profileJob = profileJob;
        this._avatarProfile = profileAvatar;
    }

    getUserInfo() {
        this._infoProfile = {};
        this._infoProfile.name =  this._profileName.textContent;
        this._infoProfile.job = this._profileJob.textContent;
        this._infoProfile.avatar = this._avatarProfile.src;
        return this._infoProfile;
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileJob.textContent = data.about;
        this._dataUser = data;
    }

    setUserAvatar(avatar) {
        this._avatarProfile.src = avatar;
      }

    getUserId() {
        return this._userId = this._dataUser._id;
      }

}