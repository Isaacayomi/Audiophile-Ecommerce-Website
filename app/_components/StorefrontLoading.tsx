type StorefrontLoadingProps = {
  title: string;
  cards: number;
};

const SkeletonBlock = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-2xl bg-surface ${className}`} />
);

export default function StorefrontLoading({
  title,
  cards,
}: StorefrontLoadingProps) {
  return (
    <div className="bg-white pt-4 md:pt-8.25 lg:pt-19.75">
      <div className="mx-6 md:mx-10 lg:mx-auto lg:max-w-277.5">
        <SkeletonBlock className="h-4 w-28" />

        <div className="mt-16 space-y-16 md:mt-20 md:space-y-20">
          {Array.from({ length: cards }).map((_, index) => (
            <div
              key={`${title}-${index}`}
              className={`grid gap-8 lg:grid-cols-2 lg:items-center ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <SkeletonBlock className="aspect-square w-full" />

              <div className="space-y-4">
                <SkeletonBlock className="h-3 w-20" />
                <SkeletonBlock className="h-12 w-3/4" />
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-5/6" />
                <SkeletonBlock className="h-12 w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
