export default function Trustpilot({ trustpilotNote }) {
  return (
    <>
      <div
        className="trustpilot-widget mt-4"
        data-locale="de-DE"
        data-template-id="5419b6a8b0d04a076446a9ad"
        data-businessunit-id="6437fa2467553cda6c2f0d37"
        data-style-height="50px"
        data-style-width="100%"
        data-theme="light"
        data-min-review-count="0"
        data-style-alignment="center"
      >
        <a
          href="https://de.trustpilot.com/review/unlike.school"
          target="_blank"
          rel="noopener"
        >
          Trustpilot
        </a>
      </div>
      <div className={"text-center p-small m-3"}>
        <hr className="w-100" />
        {trustpilotNote.map((note, i) => (
          <p className="mb-1" key={`note_trustpilot_${i}`}>
            {note}
          </p>
        ))}
      </div>
    </>
  );
}
