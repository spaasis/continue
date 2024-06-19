import { ModelProvider } from "core";
import { ftl } from "../../components/dialogs/FTCDialog";
import type { ModelPackage, InputDescriptor } from "./modelPackages";
import { ModelProviderTagVals } from "../../components/modelSelection/ModelProviderTag";
import * as modelPackagesObj from "./modelPackages";
import * as completionParamsInputsObj from "./completionParamsInputs";

export interface ModelInfo {
  title: string;
  icon?: string;
  provider: ModelProvider;
  description: string;
  longDescription?: string;
  tags?: ModelProviderTagVals[];
  packages: ModelPackage[];
  params?: any;
  collectInputFor?: InputDescriptor[];
  refPage?: string;
  apiKeyUrl?: string;
  downloadUrl?: string;
}

const completionParamsInputs = Object.values(completionParamsInputsObj);
const modelPackages = Object.values(modelPackagesObj);

const openSourcePackages = modelPackages.filter(
  ({ isOpenSource }) => isOpenSource,
);

const apiBaseInput: InputDescriptor = {
  inputType: "text",
  key: "apiBase",
  label: "API Base",
  placeholder: "e.g. http://localhost:8080",
  required: false,
};

export const MODEL_INFO: Array<ModelPackage | string> = [
  "OpenAI",
  "Anthropic",
  "Mistral",
  "Cohere",
  "Gemini",
  "Open Source",
  ...modelPackages,
];

export const PROVIDER_INFO: { [key: string]: ModelInfo } = {
  openai: {
    title: "OpenAI",
    provider: "openai",
    description: "Use gpt-4, gpt-3.5-turbo, or any other OpenAI model",
    longDescription:
      "Use gpt-4, gpt-3.5-turbo, or any other OpenAI model. See [here](https://openai.com/product#made-for-developers) to obtain an API key.",
    icon: "openai.png",
    tags: [ModelProviderTagVals.RequiresApiKey],
    packages: [
      modelPackagesObj.gpt4o,
      modelPackagesObj.gpt4turbo,
      modelPackagesObj.gpt35turbo,
      {
        ...modelPackagesObj.AUTODETECT,
        params: {
          ...modelPackagesObj.AUTODETECT.params,
          title: "OpenAI",
        },
      },
    ],
    collectInputFor: [
      {
        inputType: "text",
        key: "apiKey",
        label: "API Key",
        placeholder: "Enter your OpenAI API key",
        required: true,
      },
      ...completionParamsInputs,
    ],
    apiKeyUrl: "https://platform.openai.com/account/api-keys",
  },
  anthropic: {
    title: "Anthropic",
    provider: "anthropic",
    refPage: "anthropicllm",
    description:
      "Anthropic builds state-of-the-art models with large context length and high recall",
    icon: "anthropic.png",
    tags: [ModelProviderTagVals.RequiresApiKey],
    longDescription:
      "To get started with Anthropic models, you first need to sign up for the open beta [here](https://claude.ai/login) to obtain an API key.",
    collectInputFor: [
      {
        inputType: "text",
        key: "apiKey",
        label: "API Key",
        placeholder: "Enter your Anthropic API key",
        required: true,
      },
      ...completionParamsInputs,
      {
        ...completionParamsInputsObj.contextLength,
        defaultValue: 100_000,
      },
    ],
    packages: [
      modelPackagesObj.claude3Opus,
      modelPackagesObj.claude3Sonnet,
      modelPackagesObj.claude3Haiku,
    ],
    apiKeyUrl: "https://console.anthropic.com/account/keys",
  },
  mistral: {
    title: "Mistral API",
    provider: "mistral",
    description:
      "The Mistral API provides seamless access to their models, including Codestral, Mistral 8x22B, Mistral Large, and more.",
    icon: "mistral.png",
    longDescription: `To get access to the Mistral API, obtain your API key from [here](https://console.mistral.ai/codestral) for Codestral or the [Mistral platform](https://docs.mistral.ai/) for all other models.`,
    tags: [
      ModelProviderTagVals.RequiresApiKey,
      ModelProviderTagVals.OpenSource,
    ],
    params: {
      apiKey: "",
    },
    collectInputFor: [
      {
        inputType: "text",
        key: "apiKey",
        label: "API Key",
        placeholder: "Enter your Mistral API key",
        required: true,
      },
      ...completionParamsInputs,
    ],
    packages: [
      modelPackagesObj.codestral,
      modelPackagesObj.mistralLarge,
      modelPackagesObj.mistralSmall,
      modelPackagesObj.mistral8x22b,
      modelPackagesObj.mistral8x7b,
      modelPackagesObj.mistral7b,
    ],
    apiKeyUrl: "https://console.mistral.ai/codestral",
  },
  ollama: {
    title: "Ollama",
    provider: "ollama",
    description:
      "One of the fastest ways to get started with local models on Mac, Linux, or Windows",
    longDescription:
      'To get started with Ollama, follow these steps:\n1. Download from [ollama.ai](https://ollama.ai/) and open the application\n2. Open a terminal and run `ollama run <MODEL_NAME>`. Example model names are `codellama:7b-instruct` or `llama2:7b-text`. You can find the full list [here](https://ollama.ai/library).\n3. Make sure that the model name used in step 2 is the same as the one in config.json (e.g. `model="codellama:7b-instruct"`)\n4. Once the model has finished downloading, you can start asking questions through Continue.',
    icon: "ollama.png",
    tags: [ModelProviderTagVals.Local, ModelProviderTagVals.OpenSource],
    packages: [
      {
        ...modelPackagesObj.AUTODETECT,
        params: {
          ...modelPackagesObj.AUTODETECT.params,
          title: "Ollama",
        },
      },
      ...openSourcePackages,
    ],
    collectInputFor: [
      ...completionParamsInputs,
      { ...apiBaseInput, defaultValue: "http://localhost:11434" },
    ],
    downloadUrl: "https://ollama.ai/",
  },
  cohere: {
    title: "Cohere",
    provider: "cohere",
    refPage: "cohere",
    description:
      "Optimized for enterprise generative AI, search and discovery, and advanced retrieval.",
    icon: "cohere.png",
    tags: [ModelProviderTagVals.RequiresApiKey],
    longDescription:
      "To use Cohere, visit the [Cohere dashboard](https://dashboard.cohere.com/api-keys) to create an API key.",
    collectInputFor: [
      {
        inputType: "text",
        key: "apiKey",
        label: "API Key",
        placeholder: "Enter your Cohere API key",
        required: true,
      },
      ...completionParamsInputs,
    ],
    packages: [modelPackagesObj.commandR, modelPackagesObj.commandRPlus],
  },
  groq: {
    title: "Groq",
    provider: "groq",
    icon: "groq.png",
    description:
      "Groq is the fastest LLM provider by a wide margin, using 'LPUs' to serve open-source models at blazing speed.",
    longDescription:
      "To get started with Groq, obtain an API key from their website [here](https://wow.groq.com/).",
    tags: [
      ModelProviderTagVals.RequiresApiKey,
      ModelProviderTagVals.OpenSource,
    ],
    collectInputFor: [
      {
        inputType: "text",
        key: "apiKey",
        label: "API Key",
        placeholder: "Enter your Groq API key",
        required: true,
      },
    ],
    packages: [
      modelPackagesObj.llama370bChat,
      modelPackagesObj.llama38bChat,
      { ...modelPackagesObj.mixtralTrial, title: "Mixtral" },
      modelPackagesObj.llama270bChat,
      {
        ...modelPackagesObj.AUTODETECT,
        params: {
          ...modelPackagesObj.AUTODETECT.params,
          title: "Groq",
        },
      },
      ,
    ],
    apiKeyUrl: "https://console.groq.com/keys",
  },
  together: {
    title: "TogetherAI",
    provider: "together",
    refPage: "togetherllm",
    description:
      "Use the TogetherAI API for extremely fast streaming of open-source models",
    icon: "together.png",
    longDescription: `Together is a hosted service that provides extremely fast streaming of open-source language models. To get started with Together:\n1. Obtain an API key from [here](https://together.ai)\n2. Paste below\n3. Select a model preset`,
    tags: [
      ModelProviderTagVals.RequiresApiKey,
      ModelProviderTagVals.OpenSource,
    ],
    params: {
      apiKey: "",
    },
    collectInputFor: [
      {
        inputType: "text",
        key: "apiKey",
        label: "API Key",
        placeholder: "Enter your TogetherAI API key",
        required: true,
      },
      ...completionParamsInputs,
    ],
    packages: [
      modelPackagesObj.llama3Chat,
      modelPackagesObj.codeLlamaInstruct,
      modelPackagesObj.mistralOs,
    ].map((p) => {
      p.params.contextLength = 4096;
      return p;
    }),
  },
  gemini: {
    title: "Google Gemini API",
    provider: "gemini",
    refPage: "geminiapi",
    description:
      "Try out Google's state-of-the-art Gemini model from their API.",
    longDescription: `To get started with Google Gemini API, obtain your API key from [here](https://ai.google.dev/tutorials/workspace_auth_quickstart) and paste it below.`,
    icon: "gemini.png",
    tags: [ModelProviderTagVals.RequiresApiKey],
    collectInputFor: [
      {
        inputType: "text",
        key: "apiKey",
        label: "API Key",
        placeholder: "Enter your Gemini API key",
        required: true,
      },
    ],
    packages: [
      modelPackagesObj.gemini15Pro,
      modelPackagesObj.geminiPro,
      modelPackagesObj.gemini15Flash,
    ],
    apiKeyUrl: "https://aistudio.google.com/app/apikey",
  },
  lmstudio: {
    title: "LM Studio",
    provider: "lmstudio",
    description:
      "One of the fastest ways to get started with local models on Mac or Windows",
    longDescription:
      "LMStudio provides a professional and well-designed GUI for exploring, configuring, and serving LLMs. It is available on both Mac and Windows. To get started:\n1. Download from [lmstudio.ai](https://lmstudio.ai/) and open the application\n2. Search for and download the desired model from the home screen of LMStudio.\n3. In the left-bar, click the '<->' icon to open the Local Inference Server and press 'Start Server'.\n4. Once your model is loaded and the server has started, you can begin using Continue.",
    icon: "lmstudio.png",
    tags: [ModelProviderTagVals.Local, ModelProviderTagVals.OpenSource],
    params: {
      apiBase: "http://localhost:1234/v1/",
    },
    packages: [
      {
        ...modelPackagesObj.AUTODETECT,
        params: {
          ...modelPackagesObj.AUTODETECT.params,
          title: "LM Studio",
        },
      },
      ...openSourcePackages,
    ],
    collectInputFor: [...completionParamsInputs],
    downloadUrl: "https://lmstudio.ai/",
  },
  llamafile: {
    title: "llamafile",
    provider: "llamafile",
    icon: "llamafile.png",
    description:
      "llamafiles are a self-contained binary to run an open-source LLM",
    longDescription: `To get started with llamafiles, find and download a binary on their [GitHub repo](https://github.com/Mozilla-Ocho/llamafile?tab=readme-ov-file#quickstart). Then run it with the following command:\n\n\`\`\`shell\nchmod +x ./llamafile\n./llamafile\n\`\`\``,
    tags: [ModelProviderTagVals.Local, ModelProviderTagVals.OpenSource],
    packages: openSourcePackages,
    collectInputFor: [...completionParamsInputs],
    downloadUrl:
      "https://github.com/Mozilla-Ocho/llamafile?tab=readme-ov-file#quickstart",
  },
  replicate: {
    title: "Replicate",
    provider: "replicate",
    refPage: "replicatellm",
    description: "Use the Replicate API to run open-source models",
    longDescription: `Replicate is a hosted service that makes it easy to run ML models. To get started with Replicate:\n1. Obtain an API key from [here](https://replicate.com)\n2. Paste below\n3. Select a model preset`,
    params: {
      apiKey: "",
    },
    collectInputFor: [
      {
        inputType: "text",
        key: "apiKey",
        label: "API Key",
        placeholder: "Enter your Replicate API key",
        required: true,
      },
      ...completionParamsInputs,
    ],
    icon: "replicate.png",
    tags: [
      ModelProviderTagVals.RequiresApiKey,
      ModelProviderTagVals.OpenSource,
    ],
    packages: [
      modelPackagesObj.llama3Chat,
      modelPackagesObj.codeLlamaInstruct,
      modelPackagesObj.wizardCoder,
      modelPackagesObj.mistralOs,
    ],
    apiKeyUrl: "https://replicate.com/account/api-tokens",
  },
  llamacpp: {
    title: "llama.cpp",
    provider: "llama.cpp",
    refPage: "llamacpp",
    description: "If you are running the llama.cpp server from source",
    longDescription: `llama.cpp comes with a [built-in server](https://github.com/ggerganov/llama.cpp/tree/master/examples/server#llamacppexampleserver) that can be run from source. To do this:

1. Clone the repository with \`git clone https://github.com/ggerganov/llama.cpp\`.
2. \`cd llama.cpp\`
3. Run \`make\` to build the server.
4. Download the model you'd like to use and place it in the \`llama.cpp/models\` directory (the best place to find models is [The Bloke on HuggingFace](https://huggingface.co/TheBloke))
5. Run the llama.cpp server with the command below (replacing with the model you downloaded):

\`\`\`shell
.\\server.exe -c 4096 --host 0.0.0.0 -t 16 --mlock -m models/codellama-7b-instruct.Q8_0.gguf
\`\`\`

After it's up and running, you can start using Continue.`,
    icon: "llamacpp.png",
    tags: [ModelProviderTagVals.Local, ModelProviderTagVals.OpenSource],
    packages: openSourcePackages,
    collectInputFor: [...completionParamsInputs],
    downloadUrl: "https://github.com/ggerganov/llama.cpp",
  },
  "openai-aiohttp": {
    title: "Other OpenAI-compatible API",
    provider: "openai",
    description:
      "If you are using any other OpenAI-compatible API, for example text-gen-webui, FastChat, LocalAI, or llama-cpp-python, you can simply enter your server URL",
    longDescription: `If you are using any other OpenAI-compatible API, you can simply enter your server URL. If you still need to set up your model server, you can follow a guide below:

- [text-gen-webui](https://github.com/oobabooga/text-generation-webui/tree/main/extensions/openai#setup--installation)
- [LocalAI](https://localai.io/basics/getting_started/)
- [llama-cpp-python](https://github.com/continuedev/ggml-server-example)
- [FastChat](https://github.com/lm-sys/FastChat/blob/main/docs/openai_api.md)`,
    params: {
      apiBase: "",
    },
    collectInputFor: [
      {
        ...apiBaseInput,
        defaultValue: "http://localhost:8000/v1/",
      },
      ...completionParamsInputs,
    ],
    icon: "openai.png",
    tags: [ModelProviderTagVals.Local, ModelProviderTagVals.OpenSource],
    packages: [
      {
        ...modelPackagesObj.AUTODETECT,
        params: {
          ...modelPackagesObj.AUTODETECT.params,
          title: "OpenAI",
        },
      },
      ...openSourcePackages,
    ],
  },
  freetrial: {
    title: "Continue limited free trial",
    provider: "free-trial",
    refPage: "freetrial",
    description:
      "New users can try out Continue for free using a proxy server that securely makes calls to OpenAI, Anthropic, or Together using our API key",
    longDescription: `New users can try out Continue for free using a proxy server that securely makes calls to OpenAI, Anthropic, or Together using our API key. If you are ready to set up a model for long-term use or have used all ${ftl()} free uses, you can enter your API key or use a local model.`,
    icon: "openai.png",
    tags: [ModelProviderTagVals.Free],
    packages: [
      modelPackagesObj.codellama70bTrial,
      { ...modelPackagesObj.gpt4o, title: "GPT-4o (trial)" },
      { ...modelPackagesObj.gpt35turbo, title: "GPT-3.5-Turbo (trial)" },
      { ...modelPackagesObj.claude3Sonnet, title: "Claude 3 Sonnet (trial)" },
      { ...modelPackagesObj.claude3Haiku, title: "Claude 3 Haiku (trial)" },
      modelPackagesObj.mixtralTrial,
      { ...modelPackagesObj.gemini15Pro, title: "Gemini 1.5 Pro (trial)" },
      {
        ...modelPackagesObj.AUTODETECT,
        params: {
          ...modelPackagesObj.AUTODETECT.params,
          title: "Free Trial",
        },
      },
    ],
    collectInputFor: [...completionParamsInputs],
  },
};
