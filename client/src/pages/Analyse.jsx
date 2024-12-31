const Analyse = () => {
  return (
    <div className="h-screen flex flex-1">
      <div className="h-full w-full flex-[0.5] flex items-center justify-center">
        <div className="h-3/4 w-full mt-3 mx-7">
          <p className="text-white text-xl font-medium py-3">
            Provide Engagement Data / URL{" "}
          </p>
          <div className="h-full w-full py-1">
            {/* Tabs */}
            <div className="w-full flex items-center space-x-4 mb-2">
              <button className="bg-white w-full py-1 rounded-md">
                URL Input
              </button>
              <button className="bg-black text-white border border-neutral-800 w-full py-1 rounded-md">
                CSV Input
              </button>
            </div>
            <div className="h-20 w-full   bg-neutral-900 rounded-md"></div>
          </div>
        </div>
      </div>
      <div className="h-full flex-[0.5] flex items-center justify-center">
        <div>
          <p className="text-white">No analytics</p>
        </div>
      </div>
    </div>
  );
};

export default Analyse;
