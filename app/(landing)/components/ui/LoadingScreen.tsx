const LoadingScreen = () => (
  <div className="p-6 space-y-4 animate-pulse">
    <div className="h-6 bg-neutral-secondary-soft rounded w-1/3" />
    <div className="grid grid-cols-4 gap-4">
      <div className="h-24 bg-neutral-secondary-soft rounded" />
      <div className="h-24 bg-neutral-secondary-soft rounded" />
      <div className="h-24 bg-neutral-secondary-soft rounded" />
      <div className="h-24 bg-neutral-secondary-soft rounded" />
    </div>
  </div>
);

export default LoadingScreen;
