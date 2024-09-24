import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function attempts_Number(result) {
  return result.filter((r) => r !== undefined).length;
}

export function earnPoints_Number(result, answers, point) {
  return result
    .map((element, i) => answers[i] === element)
    .filter((i) => i)
    .map((i) => point)
    .reduce((prev, curr) => prev + curr, 0);
}
export function flagResult(totalPoints, earPoints) {
  return (totalPoints * 50) / 100 < earPoints;
}
export function correctAnswer(result, answers) {
  return result.map((element, i) => answers[i] === element).filter((t) => t).map((t) => 1).reduce((prev,curr) => prev + curr, 0)
}