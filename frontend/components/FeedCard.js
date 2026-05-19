export default function FeedCard({ item }) {
    return (
        <div className="bg-zinc-900 p-5 rounded-2xl shadow-lg border border-zinc-800">
            <h2 className="text-xl font-bold text-cyan-400">
                {item.author}
            </h2>

            <p className="text-zinc-300 mt-3">
                {item.content}
            </p>

            <p className="text-sm text-zinc-500 mt-4">
                {new Date(item.createdAt).toLocaleString()}
            </p>
        </div>
    );
}