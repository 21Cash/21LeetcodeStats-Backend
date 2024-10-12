const getClistPageIndex = (rank: number) => {
  if (rank >= 1 && rank <= 10) return 1;
  const pageIndex = Math.ceil((rank - 10) / 50) + 1;
  return pageIndex;
};

export { getClistPageIndex };
