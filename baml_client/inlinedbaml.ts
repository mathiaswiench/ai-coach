/*************************************************************************************************

Welcome to Baml! To use this generated code, please run one of the following:

$ npm install @boundaryml/baml
$ yarn add @boundaryml/baml
$ pnpm add @boundaryml/baml

*************************************************************************************************/

// This file was generated by BAML: do not edit it. Instead, edit the BAML
// files and re-generate this code.
//
/* eslint-disable */
// tslint:disable
// @ts-nocheck
// biome-ignore format: autogenerated code
const fileMap = {
  
  "clients.baml": "// Learn more about clients at https://docs.boundaryml.com/docs/snippets/clients/overview\n\nclient<llm> CustomGPT4o {\n  provider openai\n  options {\n    model \"gpt-4o\"\n    api_key env.OPENAI_API_KEY\n  }\n}\n\nclient<llm> CustomGPT4oMini {\n  provider openai\n  retry_policy Exponential\n  options {\n    model \"gpt-4o-mini\"\n    api_key env.OPENAI_API_KEY\n  }\n}\n\nclient<llm> CustomSonnet {\n  provider anthropic\n  options {\n    model \"claude-3-5-sonnet-20241022\"\n    api_key env.ANTHROPIC_API_KEY\n  }\n}\n\n\nclient<llm> CustomHaiku {\n  provider anthropic\n  retry_policy Constant\n  options {\n    model \"claude-3-haiku-20240307\"\n    api_key env.ANTHROPIC_API_KEY\n  }\n}\n\n// https://docs.boundaryml.com/docs/snippets/clients/round-robin\nclient<llm> CustomFast {\n  provider round-robin\n  options {\n    // This will alternate between the two clients\n    strategy [CustomGPT4oMini, CustomHaiku]\n  }\n}\n\n// https://docs.boundaryml.com/docs/snippets/clients/fallback\nclient<llm> OpenaiFallback {\n  provider fallback\n  options {\n    // This will try the clients in order until one succeeds\n    strategy [CustomGPT4oMini, CustomGPT4oMini]\n  }\n}\n\n// https://docs.boundaryml.com/docs/snippets/clients/retry\nretry_policy Constant {\n  max_retries 3\n  // Strategy is optional\n  strategy {\n    type constant_delay\n    delay_ms 200\n  }\n}\n\nretry_policy Exponential {\n  max_retries 2\n  // Strategy is optional\n  strategy {\n    type exponential_backoff\n    delay_ms 300\n    mutliplier 1.5\n    max_delay_ms 10000\n  }\n}",
  "generators.baml": "// This helps use auto generate libraries you can use in the language of\n// your choice. You can have multiple generators if you use multiple languages.\n// Just ensure that the output_dir is different for each generator.\ngenerator target {\n    // Valid values: \"python/pydantic\", \"typescript\", \"ruby/sorbet\", \"rest/openapi\"\n    output_type \"typescript\"\n\n    // Where the generated code will be saved (relative to baml_src/)\n    output_dir \"../\"\n\n    // The version of the BAML package you have installed (e.g. same version as your baml-py or @boundaryml/baml).\n    // The BAML VSCode extension version should also match this version.\n    version \"0.71.1\"\n\n    // Valid values: \"sync\", \"async\"\n    // This controls what `b.FunctionName()` will be (sync or async).\n    default_client_mode async\n}\n",
  "training.baml": "// Defining a data model.\nclass TrainingPlan {\n  currentTime string @description(\"Expected finishing time based on the provided training data for the given goal\")\n  currentPace int @description(\"Expected pace in seconds based on the provided training data for the given goal\")\n  training Week[]\n}\n\nclass Week {\n  week int\n  training Training[]\n}\n\nclass Interval {\n  length float @description(\"Length of one interval\")\n  targetPace int @description(\"Target pace for the interval in seconds\")\n  reptitions int @description(\"Number of repetitions\")\n  restBetweenRounds int @description(\"Rest between repetitions in seconds\")\n}\n\nclass Training {\n  day string @description(\"Day of the week for the training. Please use all days between Monday and Sunday.\")\n  activity ActivityType @description(\"Activitiy type of the training. If it is a rest day, please use REST.\")\n  targetAvgPace int @description(\"Average pace in seconds across the training session. If activity is INTERVAL_RUN use the average pace across all intervals.\")\n  length float @description(\"Total length of the training session\")\n  interval Interval | null @description(\"If activity is INTERVAL_RUN, specify the intervals\")\n\n}\n\nenum ActivityType {\n  EASY_RUN\n  LONG_RUN\n  INTERVAL_RUN\n  REST\n}\n\n// Create a function to extract the resume from a string.\nfunction TrainingPlanGenerator(data: string | null, goal: string, timeLimit: string, timeToCompetition: int) -> TrainingPlan {\n  // Specify a client as provider/model-name\n  // you can use custom LLM params with a custom client name from clients.baml like \"client CustomHaiku\"\n  client \"openai/gpt-4o\" // Set OPENAI_API_KEY to use this client.\n  prompt #\"\n    You are a running coach. The person you want to coach has the goal to complete a {{goal}}.\n    The person wants to run the {{goal}} in {{timeLimit}}.\n    Based on his training data, you want to create a Training Plan for {{timeToCompetition}} weeks.\n    Please create a training plan for each week.\n    There should be a training session planned for three days a week with a rest day in-between.\n    Training data:\n\n    {{data}}\n\n    {{ ctx.output_format }}\n  \"#\n}\n\n\ntest TrainingPlanGenerator {\n  functions [TrainingPlanGenerator]\n  args {\n    goal \"Marathon\"\n    timeLimit \"4:30:00\"\n    timeToCompetition 12\n    data \"[{'Aktivitätstyp':'Laufen','Datum':'2024-12-18 10:48:38','Favorit':'false','Titel':'Karlsruhe Laufen','Distanz':'9.72','Kalorien':'658','Zeit':'01:02:13','Ø Herzfrequenz':'139','Maximale Herzfrequenz':'154','Aerober TE':'2.6','Ø Schrittfrequenz (Laufen)':'165','Max. Schrittfrequenz (Laufen)':'180','Ø Pace':'6:24','Beste Pace':'5:31','Anstieg gesamt':'39','Abstieg gesamt':'39','Ø Schrittlänge':'0.95','Training Stress Score®':'0.0','Dekompression':'Nein','Beste Rundenzeit':'01:02:13','Anzahl der Runden':'1','Zeit in Bewegung':'01:02:12','Verstrichene Zeit':'01:02:41','Minimale Höhe':'110','Maximale Höhe':'122'}]\"\n}\n}",
}
export const getBamlFiles = () => {
    return fileMap;
}