package com.reactnativespotifyapr.spotify

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.reactnativespotifyapr.SpotifyAprModule.Companion.AUTH_REQUEST_CODE
import com.reactnativespotifyapr.spotify.event.VolumeEvent
import com.reactnativespotifyapr.spotify.model.SpotifyConfigModel
import com.spotify.android.appremote.api.*
import com.spotify.sdk.android.auth.AuthorizationClient
import com.spotify.sdk.android.auth.AuthorizationRequest
import com.spotify.sdk.android.auth.AuthorizationRequest.Builder
import com.spotify.sdk.android.auth.AuthorizationResponse.Type.TOKEN

class Spotify {
  private var connectApi: ConnectApi? = null
  private var playerApi: PlayerApi? = null
  private var contentApi: ContentApi? = null
  private var imagesApi: ImagesApi? = null
  private var userApi: UserApi? = null
  var config: SpotifyConfigModel? = null
  var connectionParams: ConnectionParams? = null
  var appRemote: SpotifyAppRemote? = null
    set(value) {
      field = value
      setApis(field)
    }

  fun setConfig(config: SpotifyConfigModel): Spotify{
    this.config = config
    setConnectionParams(config)
    return this
  }

  fun connect(context: ReactApplicationContext, onListenerResponse: Callback): Spotify {
    SpotifyAppRemote.connect(context, connectionParams,
      object : Connector.ConnectionListener {
        override fun onConnected(spotifyAppRemote: SpotifyAppRemote) {
          this@Spotify.appRemote = spotifyAppRemote
          onListenerResponse.invoke("Is connected")
        }

        override fun onFailure(throwable: Throwable) {
          val message: String = throwable.message ?: "Unkown failure"
          onListenerResponse.invoke(message)
        }
      })
    return this
  }

  fun switchToLocalDevice(){
    connectApi?.connectSwitchToLocalDevice()
  }

  fun getAuthForWebApi(context: ReactApplicationContext){
    val builder = Builder(config?.clientId, TOKEN, config?.urlCallback)

    builder.setScopes(arrayOf("streaming", "user-read-playback-state", "user-modify-playback-state"))
    val request: AuthorizationRequest = builder.build()

    AuthorizationClient.openLoginActivity(context.currentActivity, AUTH_REQUEST_CODE, request)
  }

  fun disconnect() = SpotifyAppRemote.disconnect(appRemote)
  //fun play(playlist: Playlist) = appRemote?.playerApi?.play("spotify:playlist:${playlist.name}")
  //fun play(album: String) = appRemote?.playerApi?.play("spotify:album:${album1}")
  fun play(music: String) = playerApi?.play("spotify:playlist:${music}")

  fun descrease(){
    connectApi?.connectDecreaseVolume()
  }

  fun increase(){
    connectApi?.connectIncreaseVolume()
  }

  fun setVolumeByValue(value: Float){
    connectApi?.connectSetVolume(value)
  }

  fun setObserverVolume(callback: Callback){
    val subscribe = connectApi?.subscribeToVolumeState()
    val event = VolumeEvent(callback)
    subscribe?.setEventCallback(event)
  }

  private fun setConnectionParams(config: SpotifyConfigModel): Spotify {
    config.run {
      connectionParams = ConnectionParams.Builder(clientId)
        .setRedirectUri(urlCallback)
        .showAuthView(true)
        .build()
    }
    return this
  }

  private fun setApis(appRemote: SpotifyAppRemote?){
    connectApi = appRemote?.connectApi
    playerApi = appRemote?.playerApi
    contentApi = appRemote?.contentApi
    imagesApi = appRemote?.imagesApi
    userApi = appRemote?.userApi
  }
}
