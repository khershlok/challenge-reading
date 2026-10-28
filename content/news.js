// "In the news": real articles published each week, newest issue first.
// A weekly scheduled task adds a new issue to the top of this list.
window.NEWS = [
  {
    weekOf: "2026-10-26",
    intro: "A student protest movement wins power, a claim that AGI has arrived, and why a famous psychology experiment won't go away.",
    items: [
      {
        title: "Serbia's leaderless student movement has won a historic election – but what happens next?",
        source: "The Conversation",
        author: "Eric Gordy, UCL",
        date: "2026-10-27",
        url: "https://theconversation.com/serbias-leaderless-student-movement-has-won-a-historic-election-but-what-happens-next-295268",
        theme: "Politics",
        ai: false,
        week: null,
        summary: "A student-led anti-corruption coalition with no single leader grew out of protests in 2025. It reportedly won a majority in Serbia's parliamentary election on 25 October 2026, and President Vučić's party conceded quickly. The author warns that the movement's factions have hidden their differences and will now have to govern without experience.",
        why: "This is a rare case of protest leading directly to a change of government through the ballot box. It is useful evidence for 'Do protests change anything?'",
        question: "Is a movement without leaders more democratic, or simply less able to govern?"
      },
      {
        title: "What is artificial general intelligence – and is it already here?",
        source: "The Conversation",
        author: "Waqas Ali, University of Wolverhampton",
        date: "2026-10-28",
        url: "https://theconversation.com/what-is-artificial-general-intelligence-and-is-it-already-here-293600",
        theme: "Mind",
        ai: true,
        week: null,
        summary: "OpenAI's president has said he thinks AGI, AI that matches humans across most thinking tasks, has effectively arrived with the company's newest model. The author shows that there is no agreed definition of AGI and that test results depend heavily on who runs them. He concludes that the evidence points in more than one direction.",
        why: "This shows how much depends on definitions. 'Can a machine think?' cannot be answered until you say what thinking is.",
        question: "If experts cannot agree on what 'general intelligence' means, should we stop using the term?"
      },
      {
        title: "Could humanoid robots replace soldiers on the battlefield?",
        source: "The Conversation",
        author: "Jacob Parakilas, RAND Europe",
        date: "2026-10-27",
        url: "https://theconversation.com/could-humanoid-robots-replace-soldiers-on-the-battlefield-292913",
        theme: "Ethics",
        ai: true,
        week: null,
        summary: "Ground robots are already used in Ukraine for evacuating casualties and engineering work. But the author argues that human-shaped combat robots face big practical problems: cost, battery life, and control links that can be jammed or cut. Simpler wheeled machines are likely to be more useful.",
        why: "The article is about engineering, but it raises a question it does not answer: should a machine ever decide to kill? Use it alongside Week 11.",
        question: "Would war become more or less likely if no soldiers' lives were at risk?"
      },
      {
        title: "Stanford prison experiment: why do controversial psychology studies still have such a hold on us?",
        source: "The Conversation",
        author: "David Kaposi, The Open University",
        date: "2026-10-26",
        url: "https://theconversation.com/stanford-prison-experiment-why-do-controversial-psychology-studies-still-have-such-a-hold-on-us-294814",
        theme: "Knowledge",
        ai: false,
        week: 1,
        summary: "Zimbardo's prison experiment and Milgram's obedience studies have been heavily criticised. Critics say the guards were coached and that the results were exaggerated. Yet both studies still fascinate people. The author argues that they reveal something uncomfortable: ordinary people can choose to do harm when they could choose otherwise.",
        why: "This is a good example for questions about evidence and trust. A famous finding can survive long after its methods have been challenged.",
        question: "Is a story that teaches a true lesson still valuable if the evidence behind it is flawed?"
      },
      {
        title: "Deskilling the body",
        source: "Aeon",
        author: "Melanie Challenger",
        date: "2026-10-13",
        url: "https://aeon.co/essays/the-more-we-rely-on-tech-the-more-we-deskill-our-bodies",
        theme: "Happiness",
        ai: true,
        week: null,
        summary: "This is a long essay, about 25 minutes to read. It argues that relying on GPS, phones and AI is wearing away skills our bodies evolved over millions of years, such as finding our way, remembering and moving. It cites studies on GPS users' spatial memory, and on people who lose writing confidence after copying AI text.",
        why: "It pairs well with the experience machine. It adds the idea that effort is part of what makes a skill, and perhaps a life, our own.",
        question: "Should we ever choose to do things the hard way when a machine could do them for us?"
      }
    ]
  }
];
