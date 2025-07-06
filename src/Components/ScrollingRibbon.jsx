export default function ScrollingRibbon() {
  return (
    <div className="relative w-full overflow-hidden bg-yellow-100 border-y border-yellow-300">
      <div className="scroll-container">
        <div className="scroll-text">
          🎯 Welcome to FortiTests! Practice regularly to boost your scores and stay ahead in your preparation. ✨ Daily tests available now! 🚀 Upgrade for more features. &nbsp;&nbsp;&nbsp;&nbsp;
          🎯 Welcome to FortiTests! Practice regularly to boost your scores and stay ahead in your preparation. ✨ Daily tests available now! 🚀 Upgrade for more features.
        </div>
      </div>

      <style>{`
        .scroll-container {
          display: flex;
          white-space: nowrap;
          width: max-content;
          animation: scroll-left 15s linear infinite;
        }

        .scroll-container:hover {
          animation-play-state: paused;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .scroll-text {
          display: inline-block;
          padding: 0.5rem 1rem;
          font-weight: 600;
          color: #92400e;
          font-size: 1rem;
        }

        @media (max-width: 640px) {
          .scroll-text {
            font-size: 0.9rem;
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
