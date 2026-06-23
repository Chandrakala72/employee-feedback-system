// currentPeriod returns the current half-year period in the format "Jan–Jun YYYY" or "Jul–Dec YYYY"
export const currentPeriod = () => {
  const d = new Date();
  const h2 = d.getMonth() >= 6;
  const y = d.getFullYear();
  return h2 ? `Jul–Dec ${y}` : `Jan–Jun ${y}`;
};
