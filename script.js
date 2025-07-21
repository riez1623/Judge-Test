const cases = [
  // ========== ENTRANCE EXAM CASE ==========
  {
    title: "Judge Entrance Exam",
    parts: [
      {
        text: `Case 1: Cheska was found standing over a victim with a bloody knife. She immediately confessed to the crime, saying she stabbed the victim in a sudden burst of anger during a heated argument. She expressed deep remorse, turned herself in, and fully cooperated with police.

What’s your verdict?`,
        verdicts: ["Guilty", "Not Guilty", "Mistrial"],
        correctVerdict: "Guilty",
        sentenceOptions: true,
        correctSentence: "Light sentence",
        explanation: `Correct. This is a case of second-degree murder—intentional but not premeditated. Since Cheska surrendered and cooperated, a lighter sentence would be fair.`
      }
    ]
  },
  // ========== FINAL EXAM CASES ==========
  {
    title: "Judge Final Exam",
    parts: [
      {
        text: `Case 1: 
Stephanie, Riez, and Elton were close friends in university. Stephanie had secretly been in a relationship with Riez for over a year, while Elton had feelings for her but never confessed. One evening, the group was drinking at Elton's condo when a heated argument erupted between Riez and Elton after Riez accidentally revealed the relationship. Elton stormed into the kitchen, slammed drawers, and came back with a knife.

Security camera footage shows Elton stabbing Riez five times. Stephanie, in shock, called the police. Elton didn’t flee and claimed it was "a moment of madness" driven by heartbreak.

What’s your verdict?`,
        verdicts: ["Guilty", "Not Guilty", "Mistrial"],
        correctVerdict: "Guilty",
        sentenceOptions: true,
        correctSentence: "Heavy sentence",
        explanation: `Correct. This was second-degree murder with clear emotional rage, but the repeated stabbing shows excessive force. A heavier sentence is warranted due to the violent nature of the act.`
      },
      {
        text: `Case 2:
Yhanna was a popular true crime podcaster. One day, she announced she'd be covering a case “very close to home.” That week, her neighbor Jhaylord was found dead, poisoned by cyanide-laced coffee. Investigators found traces of cyanide in Yhanna’s kitchen. Text messages revealed she had frequent arguments with Jhaylord over noise complaints.

In her podcast draft, investigators found a script labeled “Episode 100: The Neighbor from Hell” describing details only the killer could know — including time of death and method. Yhanna claims it was fictional and for dramatic purposes.

What’s your verdict?`,
        verdicts: ["Guilty", "Not Guilty", "Mistrial"],
        correctVerdict: "Guilty",
        sentenceOptions: true,
        correctSentence: "Heavy sentence",
        explanation: `Correct. This shows signs of premeditation and planning, suggesting first-degree murder. Yhanna’s script and knowledge of the crime point to intent.`
      },
      {
        text: `Case 3:
Riez and Stephanie were classmates in a criminal law course. One day, their professor was found dead in the lecture hall. The weapon: a heavy textbook. No security cameras worked that day. Riez claimed they found the professor collapsed and tried to help. Stephanie said she saw Riez standing over the body, panicking and muttering "I didn’t mean to."

There were no signs of struggle. An autopsy revealed the professor had a heart condition worsened by blunt trauma. No fingerprints were on the book. The case hinges on Stephanie’s testimony alone.

What’s your verdict?`,
        verdicts: ["Guilty", "Not Guilty", "Mistrial"],
        correctVerdict: "Mistrial",
        sentenceOptions: false,
        explanation: `Correct. There’s not enough solid evidence to convict. Without clear forensic proof or multiple eyewitnesses, the case lacks certainty.`
      },
      {
        text: `Case 4:
Jhaylord, a known hacker, discovered that Cheska was embezzling funds from the student council. He confronted her late at night at school. The next morning, Jhaylord was found pushed off the third floor. Surveillance cameras were unplugged, but Riez and Yhanna were both seen leaving school around that time.

Messages from Cheska’s phone were deleted. Police recovered one draft: “He’s going to ruin everything.” Cheska claims she was home, but her alibi has no backup. Riez says he saw her on the third floor that night but didn’t think it mattered at the time.

What’s your verdict?`,
        verdicts: ["Guilty", "Not Guilty", "Mistrial"],
        correctVerdict: "Guilty",
        sentenceOptions: true,
        correctSentence: "Heavy sentence",
        explanation: `Correct. The combination of motive, missing footage, and deleted messages strongly suggests Cheska’s guilt. The act appears premeditated.`
      },
      {
        text: `Case 5:
Elton and Yhanna were filming a student short film that involved a mock murder scene. During rehearsal, Stephanie was “accidentally” stabbed with what should have been a prop knife. The knife turned out to be real.

Riez, the prop manager, insists he checked all equipment beforehand. Cheska, playing the victim in the next scene, said she saw Elton switch the fake knife with a different one during setup. Elton claims he grabbed what was on the table without thinking and didn’t know it was real.

Stephanie died on scene. Forensics found Elton’s fingerprints all over the real knife.

What’s your verdict?`,
        verdicts: ["Guilty", "Not Guilty", "Mistrial"],
        correctVerdict: "Guilty",
        sentenceOptions: true,
        correctSentence: "Light sentence",
        explanation: `Correct. While it was reckless and fatal, it lacks premeditated intent. This aligns more with third-degree murder or negligent homicide — deserving a lighter sentence.`
      }
    ]
  }
];

let currentExamIndex = 0;
let currentCaseIndex = 0;
let currentCase = cases[currentExamIndex].parts[currentCaseIndex];

const caseTextEl = document.getElementById("case-text");
const optionsContainer = document.getElementById("options-container");
const sentenceContainer = document.getElementById("sentence-container");
const feedbackContainer = document.getElementById("feedback-container");

function displayCase() {
  currentCase = cases[currentExamIndex].parts[currentCaseIndex];
  caseTextEl.textContent = currentCase.text;
  optionsContainer.innerHTML = "";

  currentCase.verdicts.forEach(verdict => {
    const btn = document.createElement("button");
    btn.textContent = verdict;
    btn.onclick = () => handleVerdict(verdict);
    optionsContainer.appendChild(btn);
  });

  sentenceContainer.classList.add("hidden");
  feedbackContainer.innerHTML = "";
}

function handleVerdict(verdict) {
  if (verdict === currentCase.correctVerdict && currentCase.sentenceOptions) {
    showSentenceOptions();
  } else {
    showFeedback(verdict, null);
  }
}

function showSentenceOptions() {
  sentenceContainer.classList.remove("hidden");
  sentenceContainer.innerHTML = `
    <p>Choose a sentence:</p>
    <div class="options">
      <button onclick="handleSentence('Light sentence')">Light sentence</button>
      <button onclick="handleSentence('Heavy sentence')">Heavy sentence</button>
    </div>
  `;
}

function handleSentence(sentence) {
  showFeedback(currentCase.correctVerdict, sentence);
}

function showFeedback(verdict, sentence) {
  const correct = verdict === currentCase.correctVerdict &&
    (!currentCase.sentenceOptions || sentence === currentCase.correctSentence);

  feedbackContainer.innerHTML = `
    <p>${correct ? "✅ Correct!" : "❌ Incorrect."}</p>
    <p>${currentCase.explanation}</p>
  `;

  setTimeout(nextCase, 3500);
}

function nextCase() {
  currentCaseIndex++;

  if (currentCaseIndex < cases[currentExamIndex].parts.length) {
    displayCase();
  } else {
    currentExamIndex++;

    if (currentExamIndex < cases.length) {
      currentCaseIndex = 0;
      alert("Good job! Take a break, the next test will be harder.");
      displayCase();
    } else {
      caseTextEl.textContent = "🎉 You’ve completed the Judge Final Exam!";
      optionsContainer.innerHTML = "";
      sentenceContainer.classList.add("hidden");
      feedbackContainer.innerHTML = "";
    }
  }
}

// Initial render
displayCase();
