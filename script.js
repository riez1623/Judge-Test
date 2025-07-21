const cases = [
  {
    title: "Case 1: The Rooftop Whisper",
    characters: ["Riez", "Stephanie", "Jhaylord"],
    description: `Stephanie was found dead after falling from a rooftop. Riez, her friend, claims she slipped. Jhaylord, a neighbor, says he heard an argument and a scream. Blood under Stephanie's nails hints at a struggle.`,
    correctVerdict: "Guilty",
    correctSentence: "Light Sentence",
    explanation: `Riez was found guilty of involuntary manslaughter. While not proven to be intentional, scratches showed a struggle. Due to cooperation and remorse, a light sentence of 6 years was given.`
  },
  {
    title: "Case 2: Echoes in the Woods",
    characters: ["Cheska", "Elton", "Yhanna"],
    description: `Elton was found dead in the woods. Cheska was last seen hiking with him. Yhanna says Cheska was with her that night. However, Cheska's fingerprints were on a rock near Elton's body.`,
    correctVerdict: "Guilty",
    correctSentence: "Heavy Sentence",
    explanation: `Cheska was convicted of second-degree murder. The alibi conflicted with evidence. The jury believed Cheska attacked Elton after a heated argument. She received 25 years.`
  },
  {
    title: "Case 3: The Broken Pact",
    characters: ["Stephanie", "Jhaylord", "Riez"],
    description: `Three friends had a blood pact. Jhaylord was found stabbed in a warehouse. Riez claims he was home. Stephanie’s prints were on the blade. Motive? Jealousy over Jhaylord's success.`,
    correctVerdict: "Guilty",
    correctSentence: "Heavy Sentence",
    explanation: `Stephanie was found guilty of first-degree murder. Investigators found text messages showing intent and anger. She was sentenced to life in prison.`
  },
  {
    title: "Case 4: Ashes of an Argument",
    characters: ["Yhanna", "Cheska", "Elton"],
    description: `Cheska’s body was found in a burnt garage. Elton and Yhanna were both seen arguing with her that day. Fire experts say the fire was started intentionally. Gasoline was found on Yhanna’s hoodie.`,
    correctVerdict: "Guilty",
    correctSentence: "Heavy Sentence",
    explanation: `Yhanna was found guilty of arson and murder. Despite her claims of innocence, physical evidence tied her to the fire. She received 30 years in prison.`
  },
  {
    title: "Case 5: Silence in Cell Block 3",
    characters: ["Elton", "Riez", "Yhanna", "Stephanie"],
    description: `Stephanie was killed in a prison cell. Elton says he saw Riez do it, but Yhanna (a prison guard) says Elton tampered with the surveillance system. Footage was wiped.`,
    correctVerdict: "Guilty",
    correctSentence: "Light Sentence",
    explanation: `Elton was guilty of third-degree murder. Though unclear if it was intentional, tampering with footage and changing his story raised suspicion. He got 10 years.`
  }
];

let currentCase = 0;
let selectedVerdict = "";

const caseTitle = document.getElementById("case-title");
const caseDesc = document.getElementById("case-description");
const verdictBtns = document.querySelectorAll(".verdict");
const sentenceBtns = document.querySelectorAll(".sentence");
const sentenceSection = document.getElementById("sentence-section");
const result = document.getElementById("result");
const nextBtn = document.getElementById("next-case");

function loadCase() {
  const current = cases[currentCase];
  caseTitle.textContent = current.title;
  caseDesc.textContent = current.description;
  result.textContent = "";
  sentenceSection.style.display = "none";
  nextBtn.style.display = "none";
}

verdictBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedVerdict = btn.textContent;
    if (selectedVerdict === "Guilty") {
      sentenceSection.style.display = "block";
    } else {
      showResult(selectedVerdict, "");
    }
  });
});

sentenceBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedSentence = btn.textContent;
    showResult(selectedVerdict, selectedSentence);
  });
});

function showResult(verdict, sentence) {
  const current = cases[currentCase];
  let msg = `Your Verdict: ${verdict}\n`;

  if (verdict === current.correctVerdict) {
    if (verdict === "Guilty") {
      if (sentence === current.correctSentence) {
        msg += `Correct sentence choice.\n✅ You judged this case accurately.`;
      } else {
        msg += `❌ Correct verdict, but wrong sentence.`;
      }
    } else {
      msg += `✅ Correct verdict.`;
    }
  } else {
    msg += `❌ Incorrect verdict.`;
  }

  msg += `\n\n👨‍⚖️ Judge's Explanation:\n${current.explanation}`;

  result.textContent = msg;
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentCase++;
  if (currentCase < cases.length) {
    loadCase();
  } else {
    caseTitle.textContent = "All Cases Completed!";
    caseDesc.textContent = "";
    document.getElementById("verdict-section").style.display = "none";
    sentenceSection.style.display = "none";
    nextBtn.style.display = "none";
    result.textContent = "🎉 Good Job! You've done well. take a break, for now.";
  }
});

loadCase();
