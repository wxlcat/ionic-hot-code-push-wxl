import { IonicNativePlugin } from '@ionic-native/core';
import { Observable } from 'rxjs/Observable';
export interface HotCodePushVersion {
    /**
     * Application's version name. This version is visible to the user on the stores.
     */
    appVersion: string;
    /**
     * Application's build version number.
     */
    buildVersion: string;
    /**
     * Version of the web content, that is displayed to the user. Basically, value of the release property from chcp.json file in your local www folder.
     */
    currentWebVersion: string;
    /**
     * Previous web content version. This is a version of our backup. Can be empty, if there were no updates installed.
     */
    previousWebVersion: string;
    /**
     * Version number of the web content, that was loaded by the plugin and ready to be installed. Basically, value of the release property from chcp.json file on your server. Can be empty, if no update is waiting for installation.
     */
    readyToInstallWebVersion: string;
}
export interface HotCodePushUpdate {
    /**
     * Current version installed.
     */
    currentVersion: string;
    /**
     * Available version to replace the current one.
     */
    readyToInstallVersion: string;
}
export interface HotCodePushRequestOptions {
    /**
     * Url of the chcp.json config on the server. Plugin will use this one instead of <config-file url=""> from the config.xml.
     */
    'config-file'?: string;
    /**
     * Additional HTTP headers, that will be added to all requests in update download process, including loading configs and new/changed files.
     */
    'request-headers'?: {
        [key: string]: any;
    };
}
/**
 * For description on error codes, please visit https://github.com/nordnet/cordova-hot-code-push/wiki/Error-codes
 */
export declare enum ErrorCode {
    NOTHING_TO_INSTALL = 1,
    NOTHING_TO_UPDATE = 2,
    FAILED_TO_DOWNLOAD_APPLICATION_CONFIG = -1,
    APPLICATION_BUILD_VERSION_TOO_LOW = -2,
    FAILED_TO_DOWNLOAD_CONTENT_MANIFEST = -3,
    FAILED_TO_DOWNLOAD_UPDATE_FILES = -4,
    FAILED_TO_MOVE_LOADED_FILES_TO_INSTALLATION_FOLDER = -5,
    UPDATE_IS_INVALID = -6,
    FAILED_TO_COPY_FILES_FROM_PREVIOUS_RELEASE = -7,
    FAILED_TO_COPY_NEW_CONTENT_FILES = -8,
    LOCAL_VERSION_OF_APPLICATION_CONFIG_NOT_FOUND = -9,
    LOCAL_VERSION_OF_MANIFEST_NOT_FOUND = -10,
    LOADED_VERSION_OF_APPLICATION_CONFIG_NOT_FOUND = -11,
    LOADED_VERSION_OF_MANIFEST_NOT_FOUND = -12,
    FAILED_TO_INSTALL_ASSETS_ON_EXTERNAL_STORAGE = -13,
    CANT_INSTALL_WHILE_DOWNLOAD_IN_PROGRESS = -14,
    CANT_DOWNLOAD_UPDATE_WHILE_INSTALLATION_IN_PROGRESS = -15,
    INSTALLATION_ALREADY_IN_PROGRESS = -16,
    DOWNLOAD_ALREADY_IN_PROGRESS = -17,
    ASSETS_FOLDER_IS_NOT_YET_INSTALLED = -18,
    NEW_APPLICATION_CONFIG_IS_INVALID = -19,
}
export interface HotCodePushError {
    code: ErrorCode;
    description: string;
}
export interface HotCodePushEventData {
    details?: {
        error?: HotCodePushError;
    };
}
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
export declare class HotCodePush extends IonicNativePlugin {
    /**
     * Show dialog with the request to update application through the Store (App Store or Google Play).
     * @param message {string} Message to show in the dialog
     * @returns {Promise<any>} Resolves when the user is redirected to the store, rejects if the user declines.
     */
    requestApplicationUpdate(message: string): Promise<any>;
    /**
     * Download updates from the server-side.
     * @param options {HotCodePushRequestOptions} Additional options to the request. If not set - preferences from config.xml are used.
     * @returns {Promise<any>} Resolves if there is an update available, rejects otherwise.
     */
    fetchUpdate(options?: HotCodePushRequestOptions): Promise<any>;
    
    clearInternalPreferences():void;
    
    /**
     * Install update if there is anything to install.
     * @returns {Promise<any>} Resolves when the update is installed.
     */
    installUpdate(): Promise<any>;
    /**
     * Check if update was loaded and ready to be installed.
     * @returns {Promise<HotCodePushUpdate>} Resolves if an update is ready, rejects if there is no update.
     */
    isUpdateAvailableForInstallation(): Promise<HotCodePushUpdate>;
    /**
     * Gets information about the app's versions.
     * @returns {Promise<HotCodePushVersion>} Resolves with the information about the versions.
     */
    getVersionInfo(): Promise<HotCodePushVersion>;
    /**
     * Event sent when new release was successfully loaded and ready to be installed.
     * @returns {Observable<HotCodePushEventData>}
     */
    onUpdateIsReadyToInstall(): Observable<HotCodePushEventData>;
    /**
     * Event sent when plugin couldn't load update from the server. Error details are attached to the event.
     * @returns {Observable<HotCodePushEventData>}
     */
    onUpdateLoadFailed(): Observable<HotCodePushEventData>;
    /**
     * Event sent when we successfully loaded application config from the server, but there is nothing new is available.
     * @returns {Observable<HotCodePushEventData>}
     */
    onNothingToUpdate(): Observable<HotCodePushEventData>;
    /**
     * Event sent when an update is about to be installed.
     * @returns {Observable<HotCodePushEventData>}
     */
    onBeforeInstall(): Observable<HotCodePushEventData>;
    /**
     * Event sent when update was successfully installed.
     * @returns {Observable<HotCodePushEventData>}
     */
    onUpdateInstalled(): Observable<HotCodePushEventData>;
    /**
     * Event sent when update installation failed. Error details are attached to the event.
     * @returns {Observable<HotCodePushEventData>}
     */
    onUpdateInstallFailed(): Observable<HotCodePushEventData>;
    /**
     * Event sent when there is nothing to install. Probably, nothing was loaded before that.
     * @returns {Observable<HotCodePushEventData>}
     */
    onNothingToInstall(): Observable<HotCodePushEventData>;
    /**
     * Event sent when plugin is about to start installing bundle content on the external storage.
     * @returns {Observable<HotCodePushEventData>}
     */
    onBeforeAssetsInstalledOnExternalStorage(): Observable<HotCodePushEventData>;
    /**
     * Event sent when plugin successfully copied web project files from bundle on the external storage. Most likely you will use it for debug purpose only. Or even never.
     * @returns {Observable<HotCodePushEventData>}
     */
    onAssetsInstalledOnExternalStorage(): Observable<HotCodePushEventData>;
    /**
     * Event sent when plugin couldn't copy files from bundle on the external storage. If this happens - plugin won't work. Can occur when there is not enough free space on the device.
     * @returns {Observable<HotCodePushEventData>}
     */
    onAssetsInstallationError(): Observable<HotCodePushEventData>;
}
