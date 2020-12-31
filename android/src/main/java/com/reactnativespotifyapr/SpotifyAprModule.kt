package com.reactnativespotifyapr

import android.app.Activity
import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.*
import com.google.gson.Gson
import com.reactnativespotifyapr.extensions.empty
import com.reactnativespotifyapr.spotify.Spotify
import com.reactnativespotifyapr.spotify.exeception.ConfigurationNotCreatedException
import com.reactnativespotifyapr.spotify.model.SpotifyConfigModel
import com.spotify.sdk.android.auth.AuthorizationClient
import com.spotify.sdk.android.auth.AuthorizationHandler
import com.spotify.sdk.android.auth.AuthorizationResponse.Type.TOKEN
import com.spotify.sdk.android.auth.AuthorizationResponse.Type.ERROR
import com.spotify.sdk.android.auth.AuthorizationResponse

class SpotifyAprModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {
  private val gson: Gson = Gson()
  private var spotify: Spotify? = null
  private var token: String = String.empty

  init {
    reactApplicationContext.addActivityEventListener(this)
  }

  override fun getName(): String = MODULE_NAME

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod()
  fun multiply(a: Int, b: Int, promise: Promise) {
    promise.resolve(a * b)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun setConfig(clientId: String, clientIdUrfCallback: String): String {
    SpotifyConfigModel().apply {
      this.clientId = clientId
      this.urlCallback = clientIdUrfCallback
    }.run {
      spotify = Spotify()
        .setConfig(this)
    }
    return "conected"
  }

  //@ReactMethod(isBlockingSynchronousMethod = true)
  //fun setConfig(spotifyConfigJSON: String): String {
  //  val parsedConfig: SpotifyConfigModel = gson.fromJson(spotifyConfigJSON, SpotifyConfigModel::class.java)
  // spotify = Spotify(parsedConfig)
  // return gson.toJson(spotify?.connectionParams)
  //}

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun auth(){
    spotify?.getAuthForWebApi(reactApplicationContext)
  }

  @ReactMethod
  fun getToken(promise: Promise) {
    promise.resolve(token)
  }

  @ReactMethod
  fun connect(onFailureCallback: Callback) {
    spotify?.connect(reactApplicationContext, onFailureCallback)
      ?: throw ConfigurationNotCreatedException()
  }

  @ReactMethod
  fun play(playlist: String) {
    spotify?.play(playlist)
  }

  @ReactMethod
  fun disconnect() = spotify?.disconnect() ?: throw ConfigurationNotCreatedException()

  override fun onNewIntent(intent: Intent?) {}

  override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, intent: Intent?) {
    if (requestCode == AUTH_REQUEST_CODE) {
      val response: AuthorizationResponse = AuthorizationClient.getResponse(resultCode, intent)

      when (response.type) {
        TOKEN -> {
          token = response.accessToken
        }
        ERROR -> {
          token = response.error
        }
        else -> { }
      }
    }
  }

  companion object {
    private const val MODULE_NAME = "SpotifyApr"
    const val AUTH_REQUEST_CODE = 1337
  }
}
