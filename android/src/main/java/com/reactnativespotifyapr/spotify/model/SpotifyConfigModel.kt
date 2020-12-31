package com.reactnativespotifyapr.spotify.model

import com.reactnativespotifyapr.extensions.empty

data class SpotifyConfigModel(
  var clientId: String = String.empty,
  var urlCallback: String = String.empty
)

