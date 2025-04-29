export default function ChatHeader() {
  return (
    <div>
      <div className="p-4 font-bold text-2xl text-[#100833]">AI Assistant</div>
      <div className="pb-4 m-4 h-[310px] border-t border-b border-[#BCD6FB] flex flex-col justify-end items-center space-x-3">
        <img
          src="https://github.com/shadcn.png"
          alt="Avatar"
          className="w-[140px] h-[140px] rounded-full mb-4"
        />
        <div className="text-center">
          <h3 className="text-lg font-bold text-2xl text-gray-800">
            <div className="bg-gradient-to-r from-[#725AF5] to-[#5E97F7] bg-clip-text text-transparent">
              Good morning,
            </div>
            <div>John Smith</div>
          </h3>
          <p className="text-sm text-[#868686]">
            I am here to assist you with your social media tasks.
          </p>
        </div>
      </div>
    </div>
  );
}
