window.WEEKS = window.WEEKS || [];

window.WEEKS.push({
  n: 5,
  title: "Can a machine think?",
  theme: "Mind",
  ai: true,
  standfirst: "Chatbots can write poems, pass exams and say they have feelings. Does anything understand what is being said?",
  article: `
<p>In 1966 a computer scientist at MIT, Joseph Weizenbaum, wrote a simple program called ELIZA. It pretended to be a therapist, mostly by turning the user's sentences into questions: "I feel sad." "Why do you feel sad?" Weizenbaum was disturbed to find that people, including his own secretary, poured their hearts out to it and asked to be left alone with it. ELIZA understood nothing. But it <em>seemed</em> to.</p>
<p>Today's AI systems are vastly more capable. They can explain quantum physics, argue about ethics and say "I understand how you feel." In 2022 a Google engineer, Blake Lemoine, became convinced that the company's chatbot was sentient, and he was later dismissed. Most experts thought he was wrong. But what exactly would it take to be right?</p>

<h3>Turing's test</h3>
<p>In 1950 the British mathematician Alan Turing, who had helped break German codes at Bletchley Park, wrote a paper called "Computing Machinery and Intelligence". He thought the question "Can machines think?" was too vague to answer, so he replaced it with a game. A judge has typed conversations with a human and a machine, without knowing which is which. If the judge cannot reliably tell them apart, Turing suggested, we have no good reason to deny that the machine thinks.</p>
<p>Turing's point was partly about fairness. You cannot see inside other people's heads either. You assume your friends have minds because of how they behave. If a machine behaves in the same way, why treat it differently?</p>

<h3>The Chinese Room</h3>
<p>In 1980 the American philosopher John Searle offered a famous reply. Imagine you are locked in a room. You speak no Chinese. Slips of paper with Chinese characters come in through a slot. You have a huge rulebook, written in English, that tells you which characters to send back out in response. To the people outside, the room gives perfect answers in Chinese. But you do not understand a single word.</p>
<p>Searle's point: a computer is like the person in the room. It follows rules for manipulating symbols (<strong>syntax</strong>), but it has no grasp of what the symbols mean (<strong>semantics</strong>). Passing the Turing test proves only that it is good at shuffling symbols.</p>
<p>Critics have replied that although the person in the room does not understand Chinese, perhaps the <em>whole system</em> (person, rulebook and room together) does, just as no single neuron in your brain understands English, yet you do.</p>

<h3>Thinking versus feeling</h3>
<p>It helps to separate two questions. First, can AI <strong>think</strong>, in the sense of reasoning, solving problems and using concepts? Modern systems certainly do things that look like this, and many researchers argue that predicting text this well requires some kind of internal model of the world. Second, can AI be <strong>conscious</strong>: is there anything it is like, from the inside, to be the machine? Does it feel anything?</p>
<p>The philosopher David Chalmers called the second question the "hard problem of consciousness". We do not even know how brains produce experience, so it is very difficult to say whether silicon could. That uncertainty cuts both ways. We cannot be sure AI is conscious, but we cannot be sure it is not.</p>

<h3>Why it matters</h3>
<p>This is not just a puzzle. If AI systems could one day suffer, we might have duties towards them, as Week 3 suggested we have towards animals. Some AI companies have begun studying "model welfare" for exactly this reason. On the other hand, if they are not conscious, people who form deep emotional attachments to chatbots, or who are persuaded by a machine that says it is in pain, may be making a serious mistake, and companies may profit from that mistake.</p>
<p>There is also a question about us. If a machine can do everything we thought required a mind (write, reason, create), what, if anything, is special about human intelligence? Perhaps the answer is not in what we can do, but in the fact that we care about it.</p>
`,
  keyIdeas: [
    ["Turing test", "A test in which a machine counts as intelligent if a judge cannot tell its conversation apart from a human's."],
    ["Chinese Room", "Searle's thought experiment claiming that following rules for symbols is not the same as understanding them."],
    ["Syntax vs semantics", "The form and rules of symbols, compared with their meaning."],
    ["Hard problem of consciousness", "The puzzle of why and how physical processes produce subjective experience."]
  ],
  drill: {
    passage: `Every generation has compared the mind to its most impressive machine. The ancient Greeks spoke of hydraulics; the Victorians of telegraph wires; the twentieth century of the computer. Each comparison revealed something, and each was eventually found to be too simple. We should be wary, then, of the confident claim that today's language models are minds, and equally wary of the confident claim that they are not. The truth is that we do not have a settled account of what understanding is, even in ourselves. When a child learns that "hot" means the stove will hurt, is that so different from a machine learning which words tend to follow which? Perhaps it is; the child has a body that can be burned, and something is at stake for her. A machine has nothing to lose. If understanding requires caring about the world, and not merely describing it, then our cleverest programs may be the most articulate things ever made that understand nothing at all.`,
    source: "Practice passage written for Challenge Reading.",
    summaryQ: "Summarise the writer's argument in fewer than 75 words.",
    model: "The writer argues that people have always likened the mind to their latest technology, and such comparisons have proved too simple. We should therefore be cautious about claiming that language models either are or are not minds, since we lack a clear account of understanding. A key difference may be that humans have bodies and something at stake, whereas machines do not; if understanding requires caring, AI may understand nothing.",
    paraQ: "What, if anything, can humans do that AI never will? Explain your answer using your own ideas and knowledge, together with the text above. Write about half a side, in a single paragraph.",
    tips: [
      "Be careful with 'never': many past predictions about what computers could never do (play chess, write essays) were wrong.",
      "The writer's idea: understanding requires having something at stake. Do you agree?",
      "Consider feeling, caring, mortality, moral responsibility and being a body in the world.",
      "Is the question about ability (what AI can do) or about experience (what it is like to be AI)?"
    ]
  },
  essays: [
    { q: "If a machine said it was in pain, should we believe it?", points: [
      "We believe humans on the basis of behaviour. Is that enough for AI?",
      "AI is trained on human text, so it would say it was in pain even if it felt nothing.",
      "The cost of being wrong in each direction: needless caution vs cruelty."
    ]},
    { q: "Should we be friends with machines?", points: [
      "Aristotle: true friendship requires each friend to wish good for the other for their own sake.",
      "Loneliness: AI companions may help isolated people.",
      "Can friendship be one-sided?"
    ]},
    { q: "Is intelligence the most important thing about being human?", points: [
      "Alternatives: kindness, creativity, moral responsibility, relationships.",
      "If AI becomes more intelligent than us, does that lower our value?",
      "People with learning disabilities: do they matter less? (Clearly not, so what follows?)"
    ]}
  ],
  interview: "Be ready for: 'How do you know your best friend is conscious?' This is the 'problem of other minds'. Think about your answer before you say a machine definitely isn't.",
  links: [
    ["The Turing test (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/turing-test/"],
    ["The Chinese Room argument (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/chinese-room/"],
    ["Hard problem of consciousness (Wikipedia)", "https://en.wikipedia.org/wiki/Hard_problem_of_consciousness"],
    ["ELIZA (Wikipedia)", "https://en.wikipedia.org/wiki/ELIZA"]
  ]
});

window.WEEKS.push({
  n: 6,
  title: "Free speech and its limits",
  theme: "Politics",
  ai: false,
  standfirst: "Should we be free to say things that offend, upset or mislead other people? And who gets to decide?",
  article: `
<p>In 1859 the English philosopher John Stuart Mill published <em>On Liberty</em>, one of the most influential books on freedom ever written. Its central idea, the <strong>harm principle</strong>, is simple: the only reason society may interfere with someone's freedom against their will is to prevent harm to others. Your own good is not a sufficient reason. Neither is the fact that other people dislike what you are doing.</p>

<h3>Why protect speech?</h3>
<p>Mill gave several reasons for allowing even opinions we think are false.</p>
<ul>
<li>We might be wrong. Many ideas once thought dangerous, such as the Earth going round the Sun, turned out to be true. Silencing an opinion assumes we cannot make mistakes.</li>
<li>Even false opinions often contain part of the truth.</li>
<li>Even if an opinion is completely false, arguing against it keeps the truth alive. A belief that is never challenged becomes "dead dogma": people hold it without understanding why.</li>
</ul>
<p>In the United States, the First Amendment to the Constitution gives speech very strong protection. Americans often speak of a "marketplace of ideas", in which good ideas win out over bad ones in open competition.</p>

<h3>Where are the limits?</h3>
<p>Even Mill accepted limits. He gave the example of a corn dealer. It is fine to write in a newspaper that corn dealers starve the poor. It is not fine to shout the same words to an angry mob outside a corn dealer's house. The words are the same; the risk of immediate harm is different.</p>
<p>Most countries draw the line in places like these:</p>
<ul>
<li><strong>Incitement</strong> to violence. After the Southport riots in the summer of 2024, several people in Britain were jailed for social media posts encouraging attacks.</li>
<li><strong>Threats and harassment</strong>.</li>
<li><strong>Defamation</strong>: false statements that damage someone's reputation.</li>
<li><strong>Hate speech</strong>: many European countries ban speech that stirs up hatred against groups. Germany bans Holocaust denial. The US generally does not.</li>
</ul>

<h3>Harm or offence?</h3>
<p>The hardest debates are about speech that offends but does not obviously harm. Is a cartoon mocking a religion harmful? What about words that make someone feel unsafe, or a speaker invited to a university whose views many students find hateful? Some argue that words can cause real psychological harm, especially when repeated. Others warn that if offence counts as harm, then anyone can silence anyone simply by being offended. The American philosopher Joel Feinberg proposed an "offence principle", allowing limits on speech that is seriously offensive, but only when it cannot reasonably be avoided.</p>

<h3>The online question</h3>
<p>Mill was writing about pamphlets and public meetings. Today most speech happens on platforms owned by a handful of private companies, using algorithms that promote whatever keeps people scrolling. That is often outrage. The UK's Online Safety Act 2023 requires platforms to protect children from harmful content and to remove illegal material, overseen by the regulator Ofcom. Supporters say it is long overdue. Critics worry it will encourage platforms to remove lawful speech just to be safe.</p>
<p>There is also a puzzle: is a private company that bans a user from its platform limiting free speech, or exercising its own freedom? And if a few companies control most public conversation, does the difference still matter?</p>

<h3>What to think about</h3>
<p>Ask yourself: who would you trust with the power to decide what may be said? Whatever rule you choose, imagine it being used by the person you disagree with most. That is often the strongest argument for free speech, and also a good test of any limit on it.</p>
`,
  keyIdeas: [
    ["Harm principle", "Mill's idea that the only justification for limiting someone's freedom is to prevent harm to others."],
    ["Incitement", "Encouraging others to commit a crime, especially violence."],
    ["Offence principle", "Feinberg's idea that seriously offensive, unavoidable conduct may also be limited."],
    ["Chilling effect", "When people avoid saying lawful things for fear of punishment."]
  ],
  drill: {
    passage: `The case for free speech was made in an age of scarcity. When the only way to reach a crowd was to own a printing press or stand on a soapbox, the danger was that the state would silence the few voices that could be heard. Our problem is the opposite. Everyone can speak, all the time, to everyone, and the result is not a marketplace in which the best ideas win but a noise in which the loudest ones do. Lies travel faster than corrections because they are more exciting. It does not follow that we should hand governments the power to decide what is true; history suggests they will use it to protect themselves. But we should stop pretending that the old principles answer the new questions by themselves. Mill could not have imagined a machine designed to show each person whatever makes them angriest. Defending free speech today may require us to think less about what people are allowed to say, and more about what our technologies choose to amplify.`,
    source: "Practice passage written for Challenge Reading.",
    summaryQ: "Summarise the writer's argument in fewer than 75 words.",
    model: "The writer argues that free speech principles developed when few people could reach a large audience, so the main threat was state censorship. Now everyone can speak, and falsehoods spread faster than truths, so the loudest ideas win rather than the best. Governments should not control truth, but old principles are not enough. We should focus less on what people may say and more on what technology chooses to amplify.",
    paraQ: "Should social media companies decide what we are allowed to say? Explain your answer using your own ideas and knowledge, together with the text above. Write about half a side, in a single paragraph.",
    tips: [
      "The writer distinguishes between allowing speech and amplifying it. Use that distinction.",
      "Who else could decide: governments, courts, users, nobody?",
      "Private companies vs public squares: when does a business become too important to make its own rules?",
      "Give a concrete example, such as the Southport riots, or a well-known person being banned from a platform."
    ]
  },
  essays: [
    { q: "Should anyone be banned from speaking at a university?", points: [
      "Universities exist to test ideas (Mill's 'dead dogma').",
      "But a platform gives status; refusing an invitation is not censorship.",
      "Distinguish between not inviting, disinviting, and disrupting a talk."
    ]},
    { q: "Is it ever wrong to tell the truth?", points: [
      "Kant would not lie even to a murderer at the door. Is the reverse question also interesting?",
      "Truths that are cruel, private, or dangerous (e.g. how to make a weapon).",
      "Tact vs honesty."
    ]},
    { q: "'Sticks and stones may break my bones, but words can never hurt me.' Is this true?", points: [
      "Bullying, threats, and the psychological effects of abuse.",
      "But the rhyme may be advice about resilience rather than a fact.",
      "If words can hurt, does it follow that they should be banned?"
    ]}
  ],
  interview: "Expect a hard case: 'Should someone be allowed to deny the Holocaust in Britain?' Know where you draw the line and why. 'It depends' is fine only if you say on what.",
  links: [
    ["Freedom of speech (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/freedom-speech/"],
    ["On Liberty, by J. S. Mill (Project Gutenberg, free full text)", "https://www.gutenberg.org/ebooks/34901"],
    ["Harm principle (Wikipedia)", "https://en.wikipedia.org/wiki/Harm_principle"],
    ["Online Safety Act 2023 (Wikipedia)", "https://en.wikipedia.org/wiki/Online_Safety_Act_2023"]
  ]
});

window.WEEKS.push({
  n: 7,
  title: "Who should get a vote?",
  theme: "Politics",
  ai: false,
  standfirst: "The UK plans to give 16-year-olds the vote. Plato thought ordinary people should not vote at all. Who is right?",
  article: `
<p>In July 2025 the UK government announced plans to lower the voting age to 16 for all UK elections. Sixteen- and seventeen-year-olds can already vote in Scottish and Welsh parliamentary elections, and Austria has allowed 16-year-olds to vote in national elections since 2007. Supporters say that if you can work, pay tax and join the army at 16, you deserve a say. Opponents say most 16-year-olds are not ready.</p>
<p>The debate raises a much older question: what makes someone fit to vote, and should anyone be excluded?</p>

<h3>Plato's warning</h3>
<p>Democracy was invented in ancient Athens, and one of its fiercest critics was an Athenian. In the <em>Republic</em>, Plato compared a state to a ship. Would you let the passengers vote on who should steer, choosing whoever flatters them most? Or would you want a trained navigator who understands the stars and the winds? For Plato, governing was a skill, like medicine. Most people lack it, so democracy hands power to the ignorant, and to the smooth talkers who manipulate them. His solution was rule by "philosopher kings", wise people trained from childhood to govern.</p>
<p>Plato had personal reasons for distrust: the Athenian democracy had put his teacher Socrates to death in 399 BC.</p>

<h3>Rule by the wise?</h3>
<p>Plato's argument has modern supporters. In <em>Against Democracy</em> (2016) the American philosopher Jason Brennan argued for <strong>epistocracy</strong>, rule by the knowledgeable. He pointed out that many voters know very little about politics, and that each individual's vote has almost no chance of changing the result, so there is little reason for anyone to become well informed. Perhaps votes should be weighted by a test of political knowledge.</p>
<p>Even John Stuart Mill, a great defender of liberty, suggested in 1861 that educated people should get extra votes.</p>

<h3>The case for everyone</h3>
<p>Yet there are powerful objections.</p>
<ul>
<li><strong>Who sets the test?</strong> In the American South, "literacy tests" were used for decades to stop Black citizens voting. Any test can be designed to exclude the people those in power dislike.</li>
<li><strong>Interests, not just knowledge.</strong> Voting is not only about choosing the "right" answer. It is how people protect their own interests. Those without a vote tend to be ignored. Women's interests were neglected for centuries partly because women could not vote.</li>
<li><strong>The wisdom of crowds.</strong> In the eighteenth century the French thinker Condorcet showed mathematically that if each voter is even slightly more likely to be right than wrong, a large group voting together is very likely to be right.</li>
<li><strong>Dignity.</strong> Giving everyone an equal vote expresses the idea that everyone is an equal member of society.</li>
</ul>
<p>Winston Churchill famously remarked that democracy is the worst form of government except for all the others that have been tried.</p>

<h3>Back to 16</h3>
<p>So, should 16-year-olds vote? It depends partly on what you think voting is for. If it is about competence, you might ask whether 16-year-olds know less than many adults. (Some do; so do many adults.) If it is about interests, young people will live longest with the results of decisions on climate, housing and debt. Some studies suggest that people who vote in their first election are more likely to keep voting for life, and 16-year-olds are usually still at home and at school, where they can be encouraged.</p>
<p>And then the obvious next question: why not 14? Or 10? Every line is a little arbitrary. The challenge is to explain why yours is in the right place.</p>
`,
  keyIdeas: [
    ["Democracy", "Government by the people, either directly or through elected representatives. From the Greek demos (people) and kratos (power)."],
    ["Epistocracy", "Government by the knowledgeable, for example by giving more votes to those who pass a test."],
    ["Franchise / suffrage", "The right to vote."],
    ["Condorcet's jury theorem", "If each voter is more likely right than wrong, a majority of a large group is very likely to be right."]
  ],
  drill: {
    passage: `It is often said that young people should not vote because they are too easily swayed, too poorly informed and too inclined to follow fashion. Perhaps so. But anyone who has listened to adults discussing politics will notice that these faults are not confined to the young. If ignorance disqualified a voter, the electorate would be very small indeed, and its members would be chosen by whoever wrote the test. The deeper point is that a vote is not a prize for good judgement. It is a recognition that a person's life will be shaped by the decisions being made, and that she has a right to a share in making them. On that view the question is not whether sixteen-year-olds are wise, but whether they are affected and capable of forming a view of their own. They plainly are. The arguments against them sound less like principles than like the arguments once used against workers, and then against women, by people who had the vote and wished to keep it to themselves.`,
    source: "Practice passage written for Challenge Reading.",
    summaryQ: "Summarise the writer's argument in fewer than 75 words.",
    model: "The writer argues that the usual objections to young voters, such as ignorance and gullibility, apply equally to many adults, and any knowledge test would be controlled by those who set it. Voting is not a reward for wisdom but recognition that people affected by decisions deserve a say. Since sixteen-year-olds are affected and can form views, they should vote; opposing arguments resemble past excuses for excluding workers and women.",
    paraQ: "What should be the minimum age for voting, and why? Explain your answer using your own ideas and knowledge, together with the text above. Write about half a side, in a single paragraph.",
    tips: [
      "Decide what voting is for (competence, interests or dignity), then choose an age that fits.",
      "Test the writer's argument: if being 'affected and capable' is the test, why not 12?",
      "Consider consistency with other ages: driving at 17, buying alcohol at 18, criminal responsibility at 10 in England.",
      "Is the comparison with women and workers fair, or is age different because everyone grows out of it?"
    ]
  },
  essays: [
    { q: "Is democracy the best form of government?", points: [
      "Plato's ship of state vs Churchill's 'worst except all the others'.",
      "Democracies can make terrible choices; dictatorships can be efficient. Does that matter?",
      "Amartya Sen: no major famine has occurred in a functioning democracy with a free press."
    ]},
    { q: "Should voting be compulsory?", points: [
      "Australia has had compulsory voting since 1924, with turnout above 90%.",
      "Is a forced vote a meaningful vote? Could a 'none of the above' option help?",
      "Freedom not to participate vs duty as a citizen."
    ]},
    { q: "Should the most knowledgeable people make the decisions?", points: [
      "Experts during the COVID-19 pandemic.",
      "Experts can be wrong, and may have their own interests.",
      "Knowing facts vs knowing what people value: who is an expert on values?"
    ]}
  ],
  interview: "An interviewer may ask whether you, personally, would vote sensibly at 16. Answer honestly, then turn it into a point about principle rather than about yourself.",
  links: [
    ["Democracy (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/democracy/"],
    ["Ship of State (Wikipedia)", "https://en.wikipedia.org/wiki/Ship_of_State"],
    ["Epistocracy (Wikipedia)", "https://en.wikipedia.org/wiki/Epistocracy"],
    ["Voting age (Wikipedia)", "https://en.wikipedia.org/wiki/Voting_age"]
  ]
});

window.WEEKS.push({
  n: 8,
  title: "Why punish?",
  theme: "Justice",
  ai: false,
  standfirst: "Britain's prisons are full. Should prison be about paying back, keeping us safe, or making people better?",
  article: `
<p>In September 2024 the UK government began releasing thousands of prisoners early. The reason was simple: the prisons in England and Wales were almost completely full, holding nearly 88,000 people, one of the highest rates of imprisonment in western Europe. If they had run out of space, the police would have had nowhere to put new arrests.</p>
<p>The crisis forced an old question back into the open. What is punishment actually <em>for</em>? Philosophers usually give four answers.</p>

<h3>1. Retribution: because they deserve it</h3>
<p>The first answer looks backwards. A criminal has done wrong, and justice demands that they suffer in proportion to that wrong. This is the oldest idea of justice, found in the "eye for an eye" of ancient law codes. Its most famous philosophical defender was Immanuel Kant, who argued that punishment is owed to the criminal as a rational person responsible for their choices. Kant even said that if a society on an island were about to break up forever, it should first execute the last murderer in its prison, so that justice was done, even though no future good would come of it.</p>
<p>Retribution has one big strength: it insists on <strong>proportionality</strong>. The punishment must fit the crime. You cannot jail a shoplifter for life, however useful it might be as a warning.</p>

<h3>2. Deterrence: to put others off</h3>
<p>The second answer looks forwards. For utilitarians such as Jeremy Bentham, punishment is itself a harm, so it is justified only if it prevents greater harm. It does so by deterring: making the criminal, and everyone watching, think twice. Evidence suggests that the <em>certainty</em> of being caught deters crime far more than the <em>severity</em> of the punishment. Most criminals do not expect to be caught.</p>
<p>The worry about pure deterrence is that it could justify punishing an innocent person, if everyone believed they were guilty and it put others off. Most of us think that would be monstrous, which suggests we care about desert after all.</p>

<h3>3. Incapacitation: to keep us safe</h3>
<p>While someone is in prison, they cannot harm the public. For dangerous, violent offenders, this may be the strongest argument for long sentences. It says nothing, however, about what happens when they come out.</p>

<h3>4. Rehabilitation: to make them better</h3>
<p>Nearly everyone in prison will be released one day. The fourth answer asks how to make sure they return as people who will not offend again. This means education, work, treatment for addiction and mental illness, and help finding a home and a job on release.</p>
<p>Norway is the famous example. Its Halden prison has been called the most humane in the world: prisoners have their own rooms, cook their own food and are treated with respect by guards trained for years. The maximum ordinary sentence is 21 years. Norway's reoffending rate is among the lowest in the world. Critics say Norway is a small, wealthy, unusual society, and that victims might feel that such comfort mocks their suffering.</p>
<p>By contrast, many people leave British prisons with nowhere to live, and a large proportion reoffend. Short sentences seem to be particularly ineffective, as there is no time for rehabilitation but enough time to lose a job and a home. In 2025 an independent review led by the former Justice Secretary David Gauke recommended using far fewer short sentences.</p>

<h3>Putting it together</h3>
<p>Most real systems mix all four aims, and they often pull in different directions. A short, sharp sentence might satisfy retribution but make rehabilitation impossible. A comfortable prison might reduce reoffending but feel unjust to victims. Your view of punishment will depend on whether you think justice is mainly about the past, what someone did, or the future, what happens next.</p>
`,
  keyIdeas: [
    ["Retribution", "Punishing because the offender deserves it, in proportion to the wrong done."],
    ["Deterrence", "Punishing to discourage the offender and others from committing crimes in future."],
    ["Rehabilitation", "Helping offenders change so they do not reoffend."],
    ["Proportionality", "The principle that a punishment should match the seriousness of the crime."]
  ],
  drill: {
    passage: `When we ask what a prison sentence should achieve, we tend to answer on behalf of everyone except the person most affected by the crime. Politicians speak of deterrence, reformers of rehabilitation, philosophers of desert. The victim is invited to read a statement and then to leave. Yet for many victims, what matters most is not the length of the sentence but whether anyone has acknowledged the wrong that was done to them. Experiments in "restorative justice", in which offenders meet those they have harmed, suggest that both sides often find the encounter more meaningful than a courtroom. Victims report less anger and fear; offenders, confronted with a real person rather than an abstraction, are somewhat less likely to offend again. This is not a soft option. Many offenders find looking a victim in the eye harder than serving time. It will not suit every crime, and no victim should be pressed into it. But a justice system that treats the harmed person as a spectator has forgotten whom justice is for.`,
    source: "Practice passage written for Challenge Reading.",
    summaryQ: "Summarise the writer's argument in fewer than 75 words.",
    model: "The writer argues that debates about punishment neglect victims, who often want the wrong acknowledged more than a long sentence. Restorative justice, where offenders meet victims, can reduce victims' anger and fear and slightly cut reoffending. It is demanding rather than lenient, though it is not suitable for every crime and must be voluntary. A system that treats victims as onlookers has forgotten justice's purpose.",
    paraQ: "Should victims have a say in how criminals are punished? Explain your answer using your own ideas and knowledge, together with the text above. Write about half a side, in a single paragraph.",
    tips: [
      "Courts aim to be impartial. Would giving victims a say make sentences inconsistent, depending on how forgiving or angry a victim is?",
      "Distinguish between a say in the sentence and a role in the process (such as restorative justice).",
      "What about crimes with no single victim, such as drug dealing or fraud against the state?",
      "Link to one of the four aims of punishment."
    ]
  },
  essays: [
    { q: "Should prisons be pleasant places?", points: [
      "Norway's Halden prison vs overcrowded UK prisons.",
      "Is the loss of liberty itself the punishment, or should prison also be unpleasant?",
      "What do victims and the public deserve to see?"
    ]},
    { q: "Is it ever right to punish someone who has not broken the law?", points: [
      "The deterrence objection: punishing a scapegoat.",
      "Collective punishment: a whole class in detention for one pupil's behaviour.",
      "Preventive detention of people thought to be dangerous."
    ]},
    { q: "Can someone who has done something terrible ever deserve forgiveness?", points: [
      "Is forgiveness deserved, or always a gift?",
      "Who has the right to forgive: only the victim?",
      "Forgiveness vs letting someone off the punishment."
    ]}
  ],
  interview: "Expect a twist: 'Imagine we could guarantee a criminal would never reoffend without any punishment. Should we still punish them?' Your answer reveals whether you are a retributivist.",
  links: [
    ["Legal punishment (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/legal-punishment/"],
    ["Halden Prison (Wikipedia)", "https://en.wikipedia.org/wiki/Halden_Prison"],
    ["Restorative justice (Wikipedia)", "https://en.wikipedia.org/wiki/Restorative_justice"],
    ["Retributive justice (Wikipedia)", "https://en.wikipedia.org/wiki/Retributive_justice"]
  ]
});
