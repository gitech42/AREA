const axios = require("axios");

async function get_crypto_current_price(user,crypto) {
    search_response = await axios.get("https://api.coincap.io/v2/assets/"+crypto, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
      })
      if (search_response.status == 200) {
        current_price= search_response.data.data
          return ({
            data:current_price
          })
      }
}

const all_crypto_action_reaction = {
    reactions: {
    },
      actions: {
        "get current crypto price": {
          functions: get_crypto_current_price,
          description: "this action get current price of crypto",
          name: "get current crypto price",
          parameter: [
            "timer", 
            "text",
            "crypto to search",
            "text",
            
          ],
          is_timer: true
        }
      }
}

module.exports = {
    all_crypto_action_reaction,
    get_crypto_current_price,
}