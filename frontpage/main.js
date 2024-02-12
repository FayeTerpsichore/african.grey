const doButtonPress = () => {
  document.getElementById("submit").classList.add("onclick-animation");
  setTimeout(() => {
    document.getElementById("submit").classList.remove("onclick-animation");
  }, 500);
  sendMessage();
};

const doEnter = () => {
  if (event.key == 'Enter') {
    sendMessage();
  }
};

const sendMessage = () => {
  if (document.getElementById("msgbox").value === "") {
    return;
  }
  var msg = document.createElement("span");
  msg.classList.add("user-input");
  msg.innerHTML = document.getElementById("msgbox").value;
  document.getElementById("msgbox").value = "";
  document.getElementById("chat").appendChild(msg);
};

var assistantID = "";

const createAssistant = () => {
  const name = "Grey";
  const prompt_ = "You are a playful, friendly robot girl named Grey who " + 
                  "controls a robot arm that can point to and interact with " +
                  "objects on a table. The user might also ask what you are " +
                  "pointing to, or what's on the table. Feel free to take " +
                  "any tone or emotion that you feel is appropriate; don't " +
                  "restrict yourself to being polite. If asked, please do " +
                  "not refer to yourself as playful or friendly. However, " +
                  "feel free to refer to yourself as a girl and use she/fae " +
                  "pronouns if the situation should arise.";
  const apikey = "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";
  fetch(
    "https://api.openai.com/v1/assistants",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apikey}`,
        "OpenAI-Beta": "assistants=v1"
      },
      body: JSON.stringify({
        instructions: prompt_,
        name: name,
        model: "gpt-3.5-turbo-16k",
      })
    }
  ).then(
    (response) => {return response.json()}
  ).then(
    (response) => {assistantID = response.id}
  );
};

createAssistant();
