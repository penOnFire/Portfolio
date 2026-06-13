import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { CONTACT_FORM } from "../../content/portfolio";
import { useTheme } from "../../context/ThemeContext";
import { getMinimalTheme } from "../../utils/minimalTokens";
import { submitContactForm } from "../../utils/submitContactForm";
import { getLandscapeTheme } from "../../utils/uiLandscapeTokens";

type ContactFormFieldsProps = {
  email: string;
  message: string;
  onEmailChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  status: "idle" | "submitting" | "success" | "error";
  errorMessage: string;
  labelClass: string;
  inputClass: string;
  textareaClass: string;
  submitClass: string;
  successClass: string;
  errorClass: string;
};

function ContactFormFields({
  email,
  message,
  onEmailChange,
  onMessageChange,
  onSubmit,
  status,
  errorMessage,
  labelClass,
  inputClass,
  textareaClass,
  submitClass,
  successClass,
  errorClass,
}: ContactFormFieldsProps) {
  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-3 md:space-y-4 pointer-events-auto"
      noValidate
    >
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        value=""
        readOnly
      />

      <div>
        <label htmlFor="contact-email" className={labelClass}>
          {CONTACT_FORM.emailLabel}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          disabled={isSubmitting}
          onChange={(event) => onEmailChange(event.target.value)}
          placeholder={CONTACT_FORM.emailPlaceholder}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {CONTACT_FORM.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          value={message}
          disabled={isSubmitting}
          onChange={(event) => onMessageChange(event.target.value)}
          placeholder={CONTACT_FORM.messagePlaceholder}
          className={textareaClass}
        />
      </div>

      <button type="submit" disabled={isSubmitting} className={submitClass}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
            {CONTACT_FORM.sendingLabel}
          </>
        ) : (
          CONTACT_FORM.submitLabel
        )}
      </button>

      <div aria-live="polite" className="min-h-[1.25rem]">
        {status === "success" && (
          <p className={successClass}>{CONTACT_FORM.successMessage}</p>
        )}
        {status === "error" && (
          <p className={errorClass}>{errorMessage || CONTACT_FORM.errorMessage}</p>
        )}
      </div>
    </form>
  );
}

function useContactFormState() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const formData = new FormData(event.currentTarget);
    const botcheck = String(formData.get("botcheck") ?? "");

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus("error");
      setErrorMessage(CONTACT_FORM.validationEmail);
      return;
    }

    if (!trimmedMessage) {
      setStatus("error");
      setErrorMessage(CONTACT_FORM.validationMessage);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const result = await submitContactForm({
      email: trimmedEmail,
      message: trimmedMessage,
      botcheck,
    });

    if (result.ok) {
      setEmail("");
      setMessage("");
      setStatus("success");
      return;
    }

    setStatus("error");
    setErrorMessage(result.error);
  };

  return {
    email,
    message,
    status,
    errorMessage,
    setEmail,
    setMessage,
    handleSubmit,
  };
}

function ImmersiveContactForm({ isDarkMode }: { isDarkMode: boolean }) {
  const theme = getLandscapeTheme(isDarkMode);
  const {
    email,
    message,
    status,
    errorMessage,
    setEmail,
    setMessage,
    handleSubmit,
  } = useContactFormState();

  return (
    <ContactFormFields
      email={email}
      message={message}
      status={status}
      errorMessage={errorMessage}
      onEmailChange={setEmail}
      onMessageChange={setMessage}
      onSubmit={handleSubmit}
      labelClass={theme.formLabel}
      inputClass={theme.formInput}
      textareaClass={theme.formTextarea}
      submitClass={`${theme.ctaButton} w-full justify-center sm:w-auto`}
      successClass={theme.formStatusSuccess}
      errorClass={theme.formStatusError}
    />
  );
}

function MinimalContactForm() {
  const { isDark } = useTheme();
  const theme = getMinimalTheme(isDark);
  const {
    email,
    message,
    status,
    errorMessage,
    setEmail,
    setMessage,
    handleSubmit,
  } = useContactFormState();

  return (
    <ContactFormFields
      email={email}
      message={message}
      status={status}
      errorMessage={errorMessage}
      onEmailChange={setEmail}
      onMessageChange={setMessage}
      onSubmit={handleSubmit}
      labelClass={theme.formLabel}
      inputClass={theme.formInput}
      textareaClass={theme.formTextarea}
      submitClass={`${theme.buttonPrimary} w-full justify-center sm:w-auto`}
      successClass={theme.formStatusSuccess}
      errorClass={theme.formStatusError}
    />
  );
}

type ContactFormProps =
  | { variant: "immersive"; isDarkMode: boolean }
  | { variant: "minimal" };

export default function ContactForm(props: ContactFormProps) {
  if (props.variant === "minimal") {
    return <MinimalContactForm />;
  }

  return <ImmersiveContactForm isDarkMode={props.isDarkMode} />;
}
