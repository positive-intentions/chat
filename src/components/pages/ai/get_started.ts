import * as webllm from "@mlc-ai/web-llm";

function setLabel(id: string, text: string) {
  console.log({ id, text });
}

async function main() {
  try {
    const chat = new webllm.ChatModule();
    console.log("starting ai");

    chat.setInitProgressCallback((report: webllm.InitProgressReport) => {
      setLabel("init-label", report.text);
    });

    await chat.reload("vicuna-v1-7b-q4f32_0");

    const generateProgressCallback = (_step: number, message: string) => {
      setLabel("generate-label", message);
    };

    const prompt0 = "What is the capital of Canada?";
    setLabel("prompt-label", prompt0);
    const reply0 = await chat.generate(prompt0, generateProgressCallback);
    console.log(reply0);

    const prompt1 = "Can you write a poem about it?";
    setLabel("prompt-label", prompt1);
    const reply1 = await chat.generate(prompt1, generateProgressCallback);
    console.log(reply1);

    console.log(await chat.runtimeStatsText());
  } catch (e) {
    console.error(e);
  }
}

export default main;
