export const computeTotalEarned = (chores) => {
  if (!chores) return 0;

  return chores.reduce((acc, chore) => {
    return chore.isChecked ? acc + chore.rewardAmount : acc;
  }, 0);
};