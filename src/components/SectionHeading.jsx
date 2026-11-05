export default function SectionHeading({ title, children, center = false }) {
  return (
    <div className={center ? "mx-auto text-center" : ""}>
      <h2 className="section-title">{title}</h2>
      {children && <p className={`section-sub ${center ? "mx-auto" : ""}`}>{children}</p>}
    </div>
  );
}
