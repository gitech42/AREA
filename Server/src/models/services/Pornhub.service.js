const PornHub = require('@bowwow/pornhub_api');
const {porn } = require("../Pornhub.models");
const ph = new PornHub();

async function call_Pornhubapi_to_get_url(user, search_words)
{
    const response = await ph.search({search:search_words, ordering: 'featured'});
    filter = ph.filterJSON(response)
    url_to_launch = filter.videos[0].url;
    let temp = new porn({
        name: url_to_launch,
        user: user.email,
    });
    temp.save();
    return ({
      data:url_to_launch
    })
}

/// missing launch url ::: front part ?

const all_pornhub_action_reaction = {
    reactions: {
    },
      actions: {
        "get pornhub video url": {
          functions: call_Pornhubapi_to_get_url,
          description: "this action get most revelant url of category video",
          name: "get pornhub video url",
          parameter: [
            "timer", 
            "text",
            "words to search",
            "text",
          ],
          is_timer:true,
        }
      }
}

module.exports = {
    all_pornhub_action_reaction,
    call_Pornhubapi_to_get_url,
}