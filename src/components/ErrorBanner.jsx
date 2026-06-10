export default function ErrorBanner({ message }) {
  return (
    <div
      className="mb-6 rounded-xl border border-rose-400/30 bg-rose-400/15 px-4 py-3 text-sm text-rose-700"
      role="alert"
    >
      <strong className="font-semibold">Refresh warning:</strong> {message}
    </div>
  );
}
