export default 
//mission turns and the delay of a mission suc or fal delay will almost always be the 
//same but I want to keep them seperate but don't know how to make this look nicer
    {
      'intro': {
        startDescription: `This is the intro. My name is Sightseer. Would you like to join my team?`,
        options: [{label: `Count Me In`,
                  action: [{goTo: 'firstMission'}, {goTo: 'secondMission'}]
                }, 
                  {label:`I'm Not Sure I'm Ready`,
                  action: [{goTo: `delayMission`, delay: 1}, {goTo: 'declineMission'}]
                }]
      },
        'firstMission': {
            startDescription: `This is the first mission... Buy a stick...`,
            options: [{label: `I'm reafy`,
                    action: [{mission: 
                                [{name: 'Mission One', 
                                agents: 1,
                                difficulty: {Investigation: 1, Charisma: 1, Combat: 1},
                                action: [], 
                                actionSuc: [{goTo: 'successMissionOne', delay: 0}],
                                actionFail: [{goTo: 'failMissionOne'}],
                                missionTurns: 0}]
                            }]
                    }, 
                    {label:`I'm Not Sure I'm Ready`,
                    action: [{goTo: `declineMission`}]
                    }]
        },
        'secondMission': {
            startDescription: `This is the second mission... send someone to do something...`,
            options: [{label: `Got it`,
                    action: [{mission: 
                                [{name: 'Mission Two', 
                                agents: 2,
                                difficulty: {Investigation: 1, Charisma: 1, Combat: 1},
                                action: [], 
                                actionSuc: [{goTo: 'successMissionOne', delay: 2}, {addSkills: {Investigation: 1}, delay: 2}],
                                actionFail: [{goTo: 'failMissionOne'}],
                                missionTurns: 2}]
                            }]
                    }, 
                    {label:`I'm Not Sure I'm Ready`,
                    action: [{goTo: `declineMission`}]
                    }]
        },
        'declineMission': {
            startDescription: `You've declined the mission`,
            options: [{label: `restart`,
                    action: []}]
        },
        'delayMission': {
            startDescription: `this message was dalyed! Did you get it at the right time?`,
            options: [{label: `It worled`,
                    action: [{goTo: 'intro'}]}]
        },
        'got-stick': {
            startDescription: `you got the stick. You are awesome`,
            options: [{label: `Good Job`,
                    action: []}]
        },
        'successMissionOne': {
            startDescription: `you completed the mission and gained a stick`,
            options: [{label: `Good Job`,
                    action: [{addItem: 'stick'}]}]
        },
        'failMissionOne': {
            startDescription: `you failed the mission`,
            options: [{label: `oops`,
                    action: [{addItem: 'stick'}]}]
        }
    }
  