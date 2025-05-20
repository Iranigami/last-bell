type Props = {
  frames: number;
};

export default function Countdown({ frames }: Props) {
  var start = frames;
  var result = [];
  while (start > 0) {
    result.push(start--);
  }
  return (
    <div className="countdown-container size-[408px] bottom-0 mt-[1945px] mx-auto flex justify-center">
      {result!.map((frame: number) => (
        <div
          style={{
            animationName: `scaleUp`,
            animationDelay: `${frames - frame}s`,
          }}
          className="circle absolute mx-auto left-0 right-0"
          key={frame}
        >
          <div
            style={{
              animationName: `moveUp`,
              animationDelay: `${frames - frame}s`,
            }}
            className={`circle size-[408px] rounded-full bg-white flex justify-center items-center font-bold text-blue-accent font-europe`}
          >
            <span className={`text-[200px]`}>{frame}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
