const LEVELS = {
  semilla: { numMin: 1, numMax: 9, multMin: 2, multMax: 5, maxHistory: 15 },
  fuego: { numMin: 10, numMax: 99, multMin: 2, multMax: 9, maxHistory: 15 },
  rayo: { numMin: 10, numMax: 99, multMin: 4, multMax: 12, maxHistory: 20 },
  cosmos: { numMin: 1, numMax: 99, multMin: 2, multMax: 15, maxHistory: 25 },
};

const ALL_OPS = ["+", "-", "×", "÷"];

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickOperator(allowedOps) {
  return allowedOps[randInt(0, allowedOps.length - 1)];
}

function genOperands(operator, cfg) {
  let a, b;
  const { numMin, numMax, multMin, multMax } = cfg;

  switch (operator) {
    case "+":
    case "-":
      a = randInt(numMin, numMax);
      b = randInt(numMin, numMax);
      if (operator === "-" && a < b) [a, b] = [b, a];
      if (operator === "-" && a === b) a += 1;
      break;
    case "×":
      a = randInt(multMin, multMax);
      b = randInt(multMin, multMax);
      break;
    case "÷":
      b = randInt(multMin, multMax);
      a = b * randInt(multMin, multMax);
      break;
  }

  return { a, b };
}

function calcAnswer(a, operator, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return a / b;
    default:
      return 0;
  }
}

export function generateProblem(level, allowedOps = ALL_OPS, history = []) {
  const cfg = LEVELS[level];
  const maxAttempts = 50;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const operator = pickOperator(allowedOps);
    const { a, b } = genOperands(operator, cfg);
    const answer = calcAnswer(a, operator, b);
    const key = `${a}${operator}${b}`;

    const recentHistory = history.slice(-cfg.maxHistory);
    if (recentHistory.includes(key)) continue;

    return { a, b, operator, answer, key };
  }

  const operator = pickOperator(allowedOps);
  const { a, b } = genOperands(operator, cfg);
  const answer = calcAnswer(a, operator, b);
  return { a, b, operator, answer, key: `${a}${operator}${b}` };
}

export function generateOptions(correct) {
  const options = new Set([correct]);

  while (options.size < 4) {
    const offset = randInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
    const candidate = correct + offset;
    if (candidate >= 0) options.add(candidate);
  }

  return shuffle([...options]);
}

export function formatProblem(a, operator, b) {
  return `${a} ${operator} ${b}`;
}
