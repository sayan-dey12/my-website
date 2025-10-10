export default function LoadMoreButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="text-center mt-12">
      <button
        onClick={onClick}
        className="px-8 py-3 rounded-full bg-purple-600 text-white font-medium shadow hover:bg-purple-700 transition"
      >
        Load more posts
      </button>
    </div>
  );
}
