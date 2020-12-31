const axios = require('axios');

const token = "BQB82q3wg-B1PCiXfbYz1vebqk1aP5vP-ugqpd3VhJ-3N77sMlzw60AeNk2ezWnxQMQTLDDRIyIRyoYH8IdqKds12iwGmum0OeO9m-t_NeX2UsDAf-F3aj-9xJn0b8IG4OdkMdKZePeqDNrlI-YC36rGAipZkyiJQElA3WmcvTk3"

async function getResponse(){
    const response = await axios.get("https://api.spotify.com/v1/artists/163tK9Wjr9P9DmM0AVK7lm", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    console.log(JSON.stringify(response.data, null, 2))
}

getResponse()