package com.reactnativespotifyapr

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.*
import com.google.gson.Gson
import com.reactnativespotifyapr.extensions.empty
import com.reactnativespotifyapr.spotify.Spotify
import com.reactnativespotifyapr.spotify.event.VolumeEvent
import com.reactnativespotifyapr.spotify.exeception.ConfigurationNotCreatedException
import com.reactnativespotifyapr.spotify.model.SpotifyConfigModel
import com.spotify.sdk.android.auth.AuthorizationClient
import com.spotify.sdk.android.auth.AuthorizationResponse
import com.spotify.sdk.android.auth.AuthorizationResponse.Type.ERROR
import com.spotify.sdk.android.auth.AuthorizationResponse.Type.TOKEN

class SpotifyAprModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {
  private val gson: Gson = Gson()
  private var spotify: Spotify? = null
  private var token: String = String.empty
  private var mTokenPromise: Promise? = null

  init {
    reactApplicationContext.addActivityEventListener(this)
  }

  override fun getName(): String = MODULE_NAME

  @ReactMethod
  fun setConfig(clientId: String, clientIdUrfCallback: String) {
    SpotifyConfigModel().apply {
      this.clientId = clientId
      this.urlCallback = clientIdUrfCallback
    }.run {
      spotify = Spotify()
        .setConfig(this)
    }
  }

  //@ReactMethod(isBlockingSynchronousMethod = true)
  //fun setConfig(spotifyConfigJSON: String): String {
  //  val parsedConfig: SpotifyConfigModel = gson.fromJson(spotifyConfigJSON, SpotifyConfigModel::class.java)
  // spotify = Spotify(parsedConfig)
  // return gson.toJson(spotify?.connectionParams)
  //}

  @ReactMethod
  fun auth(promise: Promise){
    val currentActivity = currentActivity

    if (currentActivity == null) {
      promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist")
      return
    }

    mTokenPromise = promise

    spotify?.getAuthForWebApi(reactApplicationContext)
  }

  @ReactMethod
  fun getToken(promise: Promise) {
    promise.resolve(token)
  }

  @ReactMethod
  fun connect(onListenerResponse: Callback) {
    spotify?.connect(reactApplicationContext, onListenerResponse)
      ?: throw ConfigurationNotCreatedException()
  }

  @ReactMethod
  fun switchToLocalDevice(){
    spotify?.switchToLocalDevice()
  }

  @ReactMethod
  fun play(playlist: String) {
    spotify?.play(playlist)
  }

  @ReactMethod
  fun disconnect() = spotify?.disconnect() ?: throw ConfigurationNotCreatedException()

  @ReactMethod
  fun descrease(){
    spotify?.descrease()
  }

  @ReactMethod
  fun increase(){
    spotify?.increase()
  }

  @ReactMethod
  fun setVolumeByValue(value: Float){
    spotify?.setVolumeByValue(value)
  }

  @ReactMethod
  fun setObserverVolume(callback: Callback){
    spotify?.setObserverVolume(callback)
  }

  override fun onNewIntent(intent: Intent?) {}

  override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, intent: Intent?) {
    if (requestCode == AUTH_REQUEST_CODE) {
      val response: AuthorizationResponse = AuthorizationClient.getResponse(resultCode, intent)

      when (response.type) {
        TOKEN -> {
          token = response.accessToken
          mTokenPromise?.resolve(token)
        }
        ERROR -> {
          token = String.empty
          mTokenPromise?.reject(E_AUTHENTICATION_FAILURE, token)
        }
        else -> { }
      }
    }
  }

  companion object {
    private const val MODULE_NAME = "SpotifyApr"
    private const val E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST"
    private const val E_AUTHENTICATION_FAILURE = "E_AUTHENTICATION_FAILURE"
    const val AUTH_REQUEST_CODE = 1337
  }
}
