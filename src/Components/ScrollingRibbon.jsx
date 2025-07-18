export default function ScrollingRibbon() {
  return (
    <div className="relative w-full overflow-hidden bg-yellow-100 border-y border-yellow-100">
      <div className="scroll-container">
        <div className="scroll-text">
          🆕 New Mock Tests Added for SSC CGL, RRB Group D, TSPSC AE, and IBPS PO! 🚀 Practice Now — 100% Free with Instant Results & PDF Reports! &nbsp;&nbsp;&nbsp;&nbsp;
          🆕 New Mock Tests Added for SSC CGL, RRB Group D, TSPSC AE, and IBPS PO! 🚀 Practice Now — 100% Free with Instant Results & PDF Reports!
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
