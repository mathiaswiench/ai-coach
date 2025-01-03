// Defining a data model.
class TrainingPlan {
  currentTime string @description("Expected finishing time based on the provided training data for the given goal")
  currentPace int @description("Expected pace in seconds based on the provided training data for the given goal")
  training Week[]
}

class Week {
  week int
  training Training[]
}

class Interval {
  length float @description("Length of one interval")
  targetPace int @description("Target pace for the interval in seconds")
  reptitions int @description("Number of repetitions")
  restBetweenRounds int @description("Rest between repetitions in seconds")
}

class Training {
  day string @description("Day of the week for the training. Please use all days between Monday and Sunday.")
  activity ActivityType @description("Activitiy type of the training. If it is a rest day, please use REST.")
  targetAvgPace int @description("Average pace in seconds across the training session. If activity is INTERVAL_RUN use the average pace across all intervals.")
  length float @description("Total length of the training session")
  interval Interval @description("If activity is INTERVAL_RUN, specify the intervals")

}

enum ActivityType {
  EASY_RUN
  LONG_RUN
  INTERVAL_RUN
  REST
}

// Create a function to extract the resume from a string.
function TrainingPlanGenerator(data: string, goal: string, timeLimit: string, timeToCompetition: int) -> TrainingPlan {
  // Specify a client as provider/model-name
  // you can use custom LLM params with a custom client name from clients.baml like "client CustomHaiku"
  client "openai/gpt-4o" // Set OPENAI_API_KEY to use this client.
  prompt #"
    You are a running coach. The person you want to coach has the goal to complete a {{goal}}.
    The person wants to run the {{goal}} in {{timeLimit}}.
    Based on his training data, you want to create a Training Plan for {{timeToCompetition}} weeks.
    Please create a training plan for each week.
    There should be a training session planned for three days a week with a rest day in-between.
    Training data:

    {{data}}

    {{ ctx.output_format }}
  "#
}


test TrainingPlanGenerator {
  functions [TrainingPlanGenerator]
  args {
    goal "Marathon"
    timeLimit "4:30:00"
    timeToCompetition 12
    data "[{'Aktivitätstyp':'Laufen','Datum':'2024-12-18 10:48:38','Favorit':'false','Titel':'Karlsruhe Laufen','Distanz':'9.72','Kalorien':'658','Zeit':'01:02:13','Ø Herzfrequenz':'139','Maximale Herzfrequenz':'154','Aerober TE':'2.6','Ø Schrittfrequenz (Laufen)':'165','Max. Schrittfrequenz (Laufen)':'180','Ø Pace':'6:24','Beste Pace':'5:31','Anstieg gesamt':'39','Abstieg gesamt':'39','Ø Schrittlänge':'0.95','Training Stress Score®':'0.0','Dekompression':'Nein','Beste Rundenzeit':'01:02:13','Anzahl der Runden':'1','Zeit in Bewegung':'01:02:12','Verstrichene Zeit':'01:02:41','Minimale Höhe':'110','Maximale Höhe':'122'}]"
}
}