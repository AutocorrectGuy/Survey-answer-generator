
export type answerValueType = string | number | boolean

export type answersType = {
  [id: string]: answerValueType
}

export type weightsBasedOnPreviousType = {
  questionId: string
  weights: weightedObject[]
  isRangeHelper?: boolean
}

export type weightedObject = {
  item: answerValueType
  weight: number | weightsBasedOnPreviousType
  isRange?: boolean
}

export type questionType = {
  id: string
  li: weightedObject[]
  fullQuestion?: string
}
