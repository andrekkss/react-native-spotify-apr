package com.reactnativespotifyapr.spotify.event

import com.spotify.protocol.client.Subscription
import com.facebook.react.bridge.Callback
import com.spotify.protocol.types.VolumeState

class VolumeEvent(private val callback: Callback) : Subscription.EventCallback<VolumeState> {
  override fun onEvent(value: VolumeState?) {
    callback.invoke(value?.mVolume)
  }
}
