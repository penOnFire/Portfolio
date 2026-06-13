export type SubmitContactResult =
  | { ok: true }
  | { ok: false; error: string };

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

export async function submitContactForm(input: {
  email: string;
  message: string;
  botcheck?: string;
}): Promise<SubmitContactResult> {
  if (input.botcheck) {
    return { ok: true };
  }

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return {
      ok: false,
      error:
        "Contact form is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to your environment.",
    };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        email: input.email.trim(),
        message: input.message.trim(),
        subject: "Portfolio contact",
        botcheck: "",
      }),
    });

    const data = (await response.json()) as Web3FormsResponse;

    if (!response.ok || !data.success) {
      return {
        ok: false,
        error: data.message ?? "Something went wrong. Please try again.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Network error. Check your connection and try again.",
    };
  }
}
