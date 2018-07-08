var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Cordova, Plugin, IonicNativePlugin, CordovaCheck } from '@ionic-native/core';
import { Observable } from 'rxjs/Observable';
/**
 * For description on error codes, please visit https://github.com/nordnet/cordova-hot-code-push/wiki/Error-codes
 */
export var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["NOTHING_TO_INSTALL"] = 1] = "NOTHING_TO_INSTALL";
    ErrorCode[ErrorCode["NOTHING_TO_UPDATE"] = 2] = "NOTHING_TO_UPDATE";
    ErrorCode[ErrorCode["FAILED_TO_DOWNLOAD_APPLICATION_CONFIG"] = -1] = "FAILED_TO_DOWNLOAD_APPLICATION_CONFIG";
    ErrorCode[ErrorCode["APPLICATION_BUILD_VERSION_TOO_LOW"] = -2] = "APPLICATION_BUILD_VERSION_TOO_LOW";
    ErrorCode[ErrorCode["FAILED_TO_DOWNLOAD_CONTENT_MANIFEST"] = -3] = "FAILED_TO_DOWNLOAD_CONTENT_MANIFEST";
    ErrorCode[ErrorCode["FAILED_TO_DOWNLOAD_UPDATE_FILES"] = -4] = "FAILED_TO_DOWNLOAD_UPDATE_FILES";
    ErrorCode[ErrorCode["FAILED_TO_MOVE_LOADED_FILES_TO_INSTALLATION_FOLDER"] = -5] = "FAILED_TO_MOVE_LOADED_FILES_TO_INSTALLATION_FOLDER";
    ErrorCode[ErrorCode["UPDATE_IS_INVALID"] = -6] = "UPDATE_IS_INVALID";
    ErrorCode[ErrorCode["FAILED_TO_COPY_FILES_FROM_PREVIOUS_RELEASE"] = -7] = "FAILED_TO_COPY_FILES_FROM_PREVIOUS_RELEASE";
    ErrorCode[ErrorCode["FAILED_TO_COPY_NEW_CONTENT_FILES"] = -8] = "FAILED_TO_COPY_NEW_CONTENT_FILES";
    ErrorCode[ErrorCode["LOCAL_VERSION_OF_APPLICATION_CONFIG_NOT_FOUND"] = -9] = "LOCAL_VERSION_OF_APPLICATION_CONFIG_NOT_FOUND";
    ErrorCode[ErrorCode["LOCAL_VERSION_OF_MANIFEST_NOT_FOUND"] = -10] = "LOCAL_VERSION_OF_MANIFEST_NOT_FOUND";
    ErrorCode[ErrorCode["LOADED_VERSION_OF_APPLICATION_CONFIG_NOT_FOUND"] = -11] = "LOADED_VERSION_OF_APPLICATION_CONFIG_NOT_FOUND";
    ErrorCode[ErrorCode["LOADED_VERSION_OF_MANIFEST_NOT_FOUND"] = -12] = "LOADED_VERSION_OF_MANIFEST_NOT_FOUND";
    ErrorCode[ErrorCode["FAILED_TO_INSTALL_ASSETS_ON_EXTERNAL_STORAGE"] = -13] = "FAILED_TO_INSTALL_ASSETS_ON_EXTERNAL_STORAGE";
    ErrorCode[ErrorCode["CANT_INSTALL_WHILE_DOWNLOAD_IN_PROGRESS"] = -14] = "CANT_INSTALL_WHILE_DOWNLOAD_IN_PROGRESS";
    ErrorCode[ErrorCode["CANT_DOWNLOAD_UPDATE_WHILE_INSTALLATION_IN_PROGRESS"] = -15] = "CANT_DOWNLOAD_UPDATE_WHILE_INSTALLATION_IN_PROGRESS";
    ErrorCode[ErrorCode["INSTALLATION_ALREADY_IN_PROGRESS"] = -16] = "INSTALLATION_ALREADY_IN_PROGRESS";
    ErrorCode[ErrorCode["DOWNLOAD_ALREADY_IN_PROGRESS"] = -17] = "DOWNLOAD_ALREADY_IN_PROGRESS";
    ErrorCode[ErrorCode["ASSETS_FOLDER_IS_NOT_YET_INSTALLED"] = -18] = "ASSETS_FOLDER_IS_NOT_YET_INSTALLED";
    ErrorCode[ErrorCode["NEW_APPLICATION_CONFIG_IS_INVALID"] = -19] = "NEW_APPLICATION_CONFIG_IS_INVALID";
})(ErrorCode || (ErrorCode = {}));
;
/**
 * @name Hot Code Push
 * @description
 * HotCodePush plugin for Cordova that supports iOS and Android. This plugin allows you to keep your html, css and js files synced with your server.
 *
 * For more info, please see the detailed wiki https://github.com/nordnet/cordova-hot-code-push/wiki
 *
 * @usage
 * ```typescript
 * import { HotCodePush } from '@ionic-native/hot-code-push';
 *
 * constructor(private hotCodePush: HotCodePush) { }
 *
 * ...
 *
 * hotCodePush.fetchUpdate(options).then(data => { console.log('Update available'); });
 *
 * ```
 */
var HotCodePush = (function (_super) {
    __extends(HotCodePush, _super);
    function HotCodePush() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HotCodePush_1 = HotCodePush;
    /**
     * Show dialog with the request to update application through the Store (App Store or Google Play).
     * @param message {string} Message to show in the dialog
     * @returns {Promise<any>} Resolves when the user is redirected to the store, rejects if the user declines.
     */
    HotCodePush.prototype.requestApplicationUpdate = function (message) { return; };
    /**
     * Download updates from the server-side.
     * @param options {HotCodePushRequestOptions} Additional options to the request. If not set - preferences from config.xml are used.
     * @returns {Promise<any>} Resolves if there is an update available, rejects otherwise.
     */
    HotCodePush.prototype.fetchUpdate = function (options) {
        return new Promise(function (resolve, reject) {
            HotCodePush_1.getPlugin().fetchUpdate(function (error, data) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(data);
                }
            }, options);
        });
    };

    HotCodePush.prototype.clearInternalPreferences = function (){
      HotCodePush_1.getPlugin().clearInternalPreferences();
    }

    /**
     * Install update if there is anything to install.
     * @returns {Promise<any>} Resolves when the update is installed.
     */
    HotCodePush.prototype.installUpdate = function () { return; };
    /**
     * Check if update was loaded and ready to be installed.
     * @returns {Promise<HotCodePushUpdate>} Resolves if an update is ready, rejects if there is no update.
     */
    HotCodePush.prototype.isUpdateAvailableForInstallation = function () { return; };
    /**
     * Gets information about the app's versions.
     * @returns {Promise<HotCodePushVersion>} Resolves with the information about the versions.
     */
    HotCodePush.prototype.getVersionInfo = function () { return; };
    /**
     * Event sent when new release was successfully loaded and ready to be installed.
     * @returns {Observable<HotCodePushEventData>}
     */
    HotCodePush.prototype.onUpdateIsReadyToInstall = function () { return; };
    /**
     * Event sent when plugin couldn't load update from the server. Error details are attached to the event.
     * @returns {Observable<HotCodePushEventData>}
     */
    HotCodePush.prototype.onUpdateLoadFailed = function () { return; };
    /**
     * Event sent when we successfully loaded application config from the server, but there is nothing new is available.
     * @returns {Observable<HotCodePushEventData>}
     */
    HotCodePush.prototype.onNothingToUpdate = function () { return; };
    /**
     * Event sent when an update is about to be installed.
     * @returns {Observable<HotCodePushEventData>}
     */
    HotCodePush.prototype.onBeforeInstall = function () { return; };
    /**
     * Event sent when update was successfully installed.
     * @returns {Observable<HotCodePushEventData>}
     */
    HotCodePush.prototype.onUpdateInstalled = function () { return; };
    /**
     * Event sent when update installation failed. Error details are attached to the event.
     * @returns {Observable<HotCodePushEventData>}
     */
    HotCodePush.prototype.onUpdateInstallFailed = function () { return; };
    /**
     * Event sent when there is nothing to install. Probably, nothing was loaded before that.
     * @returns {Observable<HotCodePushEventData>}
     */
    HotCodePush.prototype.onNothingToInstall = function () { return; };
    /**
     * Event sent when plugin is about to start installing bundle content on the external storage.
     * @returns {Observable<HotCodePushEventData>}
     */
    HotCodePush.prototype.onBeforeAssetsInstalledOnExternalStorage = function () { return; };
    /**
     * Event sent when plugin successfully copied web project files from bundle on the external storage. Most likely you will use it for debug purpose only. Or even never.
     * @returns {Observable<HotCodePushEventData>}
     */
    HotCodePush.prototype.onAssetsInstalledOnExternalStorage = function () { return; };
    /**
     * Event sent when plugin couldn't copy files from bundle on the external storage. If this happens - plugin won't work. Can occur when there is not enough free space on the device.
     * @returns {Observable<HotCodePushEventData>}
     */
    HotCodePush.prototype.onAssetsInstallationError = function () { return; };
    HotCodePush.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HotCodePush.ctorParameters = function () { return []; };
    __decorate([
        Cordova(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], HotCodePush.prototype, "requestApplicationUpdate", null);
    __decorate([
        CordovaCheck(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], HotCodePush.prototype, "fetchUpdate", null);
    __decorate([
      Cordova({
          callbackStyle: 'node'
      }),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", []),
      __metadata("design:returntype", Promise)
  ], HotCodePush.prototype, "clearInternalPreferences", null);
    __decorate([
        Cordova({
            callbackStyle: 'node'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], HotCodePush.prototype, "installUpdate", null);
    __decorate([
        Cordova({
            callbackStyle: 'node'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], HotCodePush.prototype, "isUpdateAvailableForInstallation", null);
    __decorate([
        Cordova({
            callbackStyle: 'node'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], HotCodePush.prototype, "getVersionInfo", null);
    __decorate([
        Cordova({
            eventObservable: true,
            event: 'chcp_updateIsReadyToInstall'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Observable)
    ], HotCodePush.prototype, "onUpdateIsReadyToInstall", null);
    __decorate([
        Cordova({
            eventObservable: true,
            event: 'chcp_updateLoadFailed'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Observable)
    ], HotCodePush.prototype, "onUpdateLoadFailed", null);
    __decorate([
        Cordova({
            eventObservable: true,
            event: 'chcp_nothingToUpdate'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Observable)
    ], HotCodePush.prototype, "onNothingToUpdate", null);
    __decorate([
        Cordova({
            eventObservable: true,
            event: 'chcp_beforeInstall'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Observable)
    ], HotCodePush.prototype, "onBeforeInstall", null);
    __decorate([
        Cordova({
            eventObservable: true,
            event: 'chcp_updateInstalled'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Observable)
    ], HotCodePush.prototype, "onUpdateInstalled", null);
    __decorate([
        Cordova({
            eventObservable: true,
            event: 'chcp_updateInstallFailed'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Observable)
    ], HotCodePush.prototype, "onUpdateInstallFailed", null);
    __decorate([
        Cordova({
            eventObservable: true,
            event: 'chcp_nothingToInstall'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Observable)
    ], HotCodePush.prototype, "onNothingToInstall", null);
    __decorate([
        Cordova({
            eventObservable: true,
            event: 'chcp_beforeAssetsInstalledOnExternalStorage'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Observable)
    ], HotCodePush.prototype, "onBeforeAssetsInstalledOnExternalStorage", null);
    __decorate([
        Cordova({
            eventObservable: true,
            event: 'chcp_assetsInstalledOnExternalStorage'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Observable)
    ], HotCodePush.prototype, "onAssetsInstalledOnExternalStorage", null);
    __decorate([
        Cordova({
            eventObservable: true,
            event: 'chcp_assetsInstallationError'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Observable)
    ], HotCodePush.prototype, "onAssetsInstallationError", null);
    HotCodePush = HotCodePush_1 = __decorate([
        Plugin({
            pluginName: 'HotCodePush',
            plugin: 'cordova-hot-code-push',
            pluginRef: 'chcp',
            repo: 'https://github.com/nordnet/cordova-hot-code-push',
            platforms: ['Android', 'iOS']
        })
    ], HotCodePush);
    return HotCodePush;
    var HotCodePush_1;
}(IonicNativePlugin));
export { HotCodePush };
//# sourceMappingURL=index.js.map