### AI Coach
Can an LLM write good a training plan to finish a marathon? This is the test.

### Approach
You can upload a `.csv` file containing recent athletic activities e.g. from [Garmin Connect](https://connect.garmin.com/). This is optional and you could also skip this step.
Next you define your target. Currently, `Marathon` or `Half-Marathon` is supported. Together with your `target_time` and `date_of_competition` the LLM creates a training plan using. 

Their is a DB running only for user authentication purposes. No data is stored. If you upload your a `.csv` it will be stored in your `sessionStorage`.

Initially, I planned to have a dedicated [python backend](https://github.com/mathiaswiench/prava_backend) to parse the relevant data.
For simplicity reasons, I later tried to rewrite it only using `TypeScript` and `Next.JS`.

### BAML
[BAML: Basically a Made-up Language](https://github.com/BoundaryML/baml) `BAML is a domain-specific language to generate structured outputs from LLMs` in this project it used to write function called `TrainingPlanGenerator` that takes the activitiy data (optional), your activity, your target and schedule and creates a training plan. The beauty of BAML is, that you can be explicit about the input and output types.

### How to run locally

1. First add the respective credentials in `env.example`. Pleae set `NEXT_USER_AUTHENTICATION` if you don't want to use the `AuthProvider` for user authentication
2. Run `npm run dev` in root