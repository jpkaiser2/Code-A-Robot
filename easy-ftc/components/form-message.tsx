export type Message =
  | ({ success: string } & { formId?: string })
  | ({ error: string } & { formId?: string })
  | ({ message: string } & { formId?: string });

export function FormMessage({ message, formIdentifier }: {
  message: Message | undefined,
  formIdentifier?: string
}) {
  if (!message || (message.formId && message.formId !== formIdentifier)) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 w-full text-sm mt-2">
      {"success" in message && (
        <div className="text-foreground border-l-2 border-foreground px-4">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-destructive-foreground border-l-2 border-destructive-foreground px-4">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-foreground border-l-2 px-4">{message.message}</div>
      )}
    </div>
  );
}
