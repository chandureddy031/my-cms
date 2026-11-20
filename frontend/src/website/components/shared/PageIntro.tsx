/** Title block at the top of every inner page. */
export function PageIntro({ title, text, children }: { title: string; text?: string; children?: React.ReactNode }) {
  return (
    <div className="border-b border-soil-line bg-soil-band py-16 sm:py-20">
      <div className="soil-x">
        <h1 className="soil-h1 max-w-3xl">{title}</h1>
        {text && <p className="soil-lead mt-5">{text}</p>}
        {children}
      </div>
    </div>
  );
}
