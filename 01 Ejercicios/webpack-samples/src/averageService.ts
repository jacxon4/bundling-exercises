const getTotalScore = (scores: number[]): number => scores.reduce((score, count) => score + count);
export const getAvg = (scores: number[]): number => getTotalScore(scores) / scores.length;