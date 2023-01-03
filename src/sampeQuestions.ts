import { questionType, weightedObject } from './models/AnswerGenerator/AnswerGenerator.types'

const q1 = {
  id: 'q1',
  fullQuestion: '1. Vecums (no 18)',
  li: [
    { item: '18-24', weight: 1, isRange: true },
    { item: '25-34', weight: 0, isRange: true },
    { item: '65-80', weight: 1, isRange: true },
  ]
}

const q2 = {
  id: 'q2',
  fullQuestion: 'Dzimums',
  li: [
    {
      item: 'vīrietis', weight: {
        questionId: 'q1',
        weights: [
          { item: '18-24', weight: 1 },
          { item: '25-34', weight: 0 },
          { item: '65-80', weight: 0 },
        ],
        isRangeHelper: true
      }
    },
    {
      item: 'sieviete', weight: {
        questionId: 'q1',
        weights: [
          { item: '18-24', weight: 0 },
          { item: '25-34', weight: 0 },
          { item: '65-80', weight: 1 },
        ],
        isRangeHelper: true
      }
    },
  ]
}

const q3 = {
  id: 'q3',
  fullQuestion: 'Kurš no piedāvātajiem augļiem garšo visvairāk?',
  li: [
    { item: '🍎', weight: 1 },
    { item: '🍐', weight: 1 },
    { item: '🍇', weight: 1 },
  ]
}

const q4 = {
  id: 'q4',
  fullQuestion: 'Ko atbildējāt iepriekšējā jautājumā?',
  li: [
    {
      item: '>>🍎<<', weight: {
        questionId: 'q3',
        weights: [
          { item: '🍎', weight: 1 },
          { item: '🍐', weight: 0 },
          { item: '🍇', weight: 0 },
        ]
      }
    },
    {
      item: '>>🍐<<', weight: {
        questionId: 'q3',
        weights: [
          { item: '🍎', weight: 0 },
          { item: '🍐', weight: 1 },
          { item: '🍇', weight: 0 },
        ]
      }
    },
    {
      item: '>>🍇<<', weight: {
        questionId: 'q3',
        weights: [
          { item: '🍎', weight: 0 },
          { item: '🍐', weight: 0 },
          { item: '🍇', weight: 1 },
        ]
      }
    },
  ]
}

export const questions: questionType[] = [q1, q2, q3, q4]