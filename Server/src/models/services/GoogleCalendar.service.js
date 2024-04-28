const axios = require("axios");

async function call_api_to_add_event_googlecalendar(
  user,
  endTime,
  startTime,
  description,
  title,
) {
  console.log("voici mon title :" + title);
  email = user.email.replace("@", "%40");
  response = await axios.post(
    "https://www.googleapis.com/calendar/v3/calendars/" + email + "/events",
    {
      ////////////////////////////////////////////////////////////////////////////
      ////////////// DONT FORGET TO ADD UcSER'S EMAIL TO URL                 //////////////////
      /////////////////////   WITH THIS FORMAT: barkallah.bi%40gmail.com    //////////////////
      end: {
        dateTime: endTime, ///// at this format 2022-11-04T9:30:00-07:00
      },
      start: {
        dateTime: startTime, ////"2022-11-04T10:00:00-07:00"
      },
      description: description,
      summary: title
    },
    {
      headers: {
        Authorization: "Bearer " + user.google_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status == 200) {
    console.log(response.data);
    console.log("event added");
  }
}

const all_calendar_action_reaction = {
  reactions: {
    "add event": {
      functions: call_api_to_add_event_googlecalendar,
      description: "this reaction create an event on your calendar",
      name: "add event",
      parameter: [
        "end time event (Y-M-D h:m:s)",
        "text",
        "start time event (Y-M-D h:m:s)",
        "text",
        "description",
        "text",
        "title",
        "text",
      ],
    },
  },
  actions: {},
};

module.exports = {
  all_calendar_action_reaction,
  call_api_to_add_event_googlecalendar,
};
