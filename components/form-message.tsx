export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm mt-4">
      {"success" in message && (
        <div className="text-green-600 border-l-2 border-green-600 px-4 py-2 bg-green-50 dark:bg-green-900/20">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-red-600 border-l-2 border-red-600 px-4 py-2 bg-red-50 dark:bg-red-900/20 font-medium">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-blue-600 border-l-2 border-blue-600 px-4 py-2 bg-blue-50 dark:bg-blue-900/20">
          {message.message}
        </div>
      )}
    </div>
  );
}
