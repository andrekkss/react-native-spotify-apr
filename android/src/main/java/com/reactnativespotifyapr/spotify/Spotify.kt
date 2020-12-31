package com.reactnativespotifyapr.spotify

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.reactnativespotifyapr.SpotifyAprModule.Companion.AUTH_REQUEST_CODE
import com.reactnativespotifyapr.spotify.model.SpotifyConfigModel
import com.spotify.android.appremote.api.ConnectionParams
import com.spotify.android.appremote.api.Connector
import com.spotify.android.appremote.api.SpotifyAppRemote
import com.spotify.sdk.android.auth.AccountsQueryParameters
import com.spotify.sdk.android.auth.AuthorizationClient
import com.spotify.sdk.android.auth.AuthorizationRequest
import com.spotify.sdk.android.auth.AuthorizationRequest.Builder
import com.spotify.sdk.android.auth.AuthorizationResponse.Type.TOKEN

class Spotify {
  var config: SpotifyConfigModel? = null
  var connectionParams: ConnectionParams? = null
  var appRemote: SpotifyAppRemote? = null

  fun setConfig(config: SpotifyConfigModel): Spotify{
    this.config = config
    setConnectionParams(config)
    return this
  }

  fun connect(context: ReactApplicationContext, onFailureCallback: Callback): Spotify {
    SpotifyAppRemote.connect(context, connectionParams,
      object : Connector.ConnectionListener {
        override fun onConnected(spotifyAppRemote: SpotifyAppRemote) {
          this@Spotify.appRemote = spotifyAppRemote
        }

        override fun onFailure(throwable: Throwable) {
          val message: String = throwable.message ?: "Unkown failure"
          onFailureCallback.invoke(message)
        }
      })
    return this
  }

  fun getAuthForWebApi(context: ReactApplicationContext){
    val builder = Builder(config?.clientId, TOKEN, config?.urlCallback)

    builder.setScopes(arrayOf("streaming"))
    val request: AuthorizationRequest = builder.build()

    AuthorizationClient.openLoginActivity(context.currentActivity, AUTH_REQUEST_CODE, request)
  }

  fun disconnect() = SpotifyAppRemote.disconnect(appRemote)
  //fun play(playlist: Playlist) = appRemote?.playerApi?.play("spotify:playlist:${playlist.name}")
  //fun play(album: String) = appRemote?.playerApi?.play("spotify:album:${album1}")
  fun play(music: String) = appRemote?.playerApi?.play("spotify:playlist:${music}")


  private fun setConnectionParams(config: SpotifyConfigModel): Spotify {
    config.run {
      connectionParams = ConnectionParams.Builder(clientId)
        .setRedirectUri(urlCallback)
        .showAuthView(true)
        .build()
    }
    return this
  }
}
