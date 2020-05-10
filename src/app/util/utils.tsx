export const getDateString = (date: Date) => `${date.getFullYear()}-${date.getMonth() < 10
    ? "0" + (date.getMonth() + 1)
    : (date.getMonth() + 1)}-${date.getDate() < 10
        ? "0" + date.getDate()
        : date.getDate()}`

export const getDiffInDays = (from: Date, to: Date) =>
    Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))