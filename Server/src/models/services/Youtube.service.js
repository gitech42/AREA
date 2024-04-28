const axios = require("axios");
const { call_api_to_check_if_pr_is_merge } = require("./Github.service");
async function test_search_video(user) {
  response = await axios.get(
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=ziakakimbo&type=video",
    {
      headers: {
        Authorization: "Bearer " + user.google_token,
      },
    }
  );
  if (response.status == 200) {
    console.log(response.data);
  }
}

async function call_api_to_check_if_youtubeur_upload(
  user,
  youtubeur,
  last_videoCount
) {
  //youtubeur = youtubeur.replace(" ", "%20")
  //search_response = await axios.get(
  //  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" +
  //    youtubeur +
  //    "&type=channel",
  //  {
  //    headers: {
  //      Authorization: "Bearer " + user.google_token,
  //    },
  //  }
  //);
  //if (search_response.status == 200) {
  //  search_response = search_response.data.items[0].id.channelId;
  //}
  //console.log(search_response);
  response = await axios.get(
    "https://youtube.googleapis.com/youtube/v3/channels?part=statistics&maxResults=1&id=" +
      youtubeur,
    {
      headers: {
        Authorization: "Bearer " + user.google_token,
      },
    }
  );
  if (response.status == 200) {
    data = response.data.items[0].statistics.videoCount;
    data=data.replace(" ", "");
    data=data.replace("\"", "")
    console.log("dataaaa=",data)
    return {
      data: data,
      check: data !== last_videoCount,
    };
  }
}

async function call_api_to_comment(user, video_id, text_to_comment) {
  response = await axios.post(
    "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet",
    {
      snippet: {
        videoId: video_id,
        topLevelComment: {
          snippet: {
            textOriginal: text_to_comment,
          },
        },
      },
    },
    {
      headers: {
        Authorization: "Bearer " + user.google_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.status);
  console.log(response.data);
  // }
}

async function call_api_to_like(user, video_id, text_to_comment) {
  response = await axios.post(
    "https://youtube.googleapis.com/youtube/v3/videos/rate?id=" +
      video_id +
      "&rating=like&part=snippet",
    {},
    {
      headers: {
        Authorization: "Bearer " + user.google_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status == 204) {
    console.log(response.data);
    console.log("c carer");
    // }
  }
}

// if it will not work, add "part=snippet" in the url.

async function call_api_to_report(user, video_id, text_to_comment) {
  response = await axios.post(
    "https://youtube.googleapis.com/youtube/v3/videos/reportAbuse",
    {
      videoId: video_id,
      comments: "",
      language: "",
      reasonId: "N",
    },
    {
      headers: {
        Authorization: "Bearer " + user.google_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status == 204) {
    console.log(response.data);
    console.log("c carer");
    // }
  }
}
const all_youtube_action_reaction = {
  reactions: {
    "comment video": {
      functions: call_api_to_comment,
      description: "this reaction comment video",
      name: "comment video",
      parameter: ["video id", "text", "text to comment", "text"],
    },
    "like video": {
      functions: call_api_to_like,
      description: "this reaction like video",
      name: "like video",
      parameter: ["video id", "text"],
    },
    "report video": {
      functions: call_api_to_report,
      description: "this reaction report video",
      name: "report video",
      parameter: ["video id", "text"],
    },
  },
  actions: {
    "check upload video": {
      functions: call_api_to_check_if_youtubeur_upload,
      description: "this reaction check if youtubeur has uploaded a new video",
      name: "check upload video",
      parameter: ["youtubeur name", "text"],
      is_checker: true,
    },
  },
};

module.exports = {
  all_youtube_action_reaction,
  call_api_to_like,
  call_api_to_comment,
  call_api_to_report,
  call_api_to_check_if_youtubeur_upload,
};

/*
async function l() {
  let r = await call_api_to_check_if_youtubeur_upload()
  console.log(r)
}

*    or call this functions to get data promise */

//////////////////  Set global because "await" return "promises"!!!!!!!
