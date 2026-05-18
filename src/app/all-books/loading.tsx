export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <div className="h-4 w-16 bg-slate-200 rounded animate-pulse mb-2" />
        <div className="h-9 w-48 bg-slate-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-64 bg-slate-200 rounded animate-pulse" />
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-60 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200/60 p-5">
            <div className="h-3 w-20 bg-slate-200 rounded animate-pulse mb-4" />
            <div className="flex flex-row lg:flex-col gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="h-12 bg-white border border-slate-200 rounded-xl mb-6 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
                <div className="h-56 bg-slate-200 animate-pulse" />
                <div className="p-5">
                  <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse mb-4" />
                  <div className="h-10 bg-slate-200 rounded-xl animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
