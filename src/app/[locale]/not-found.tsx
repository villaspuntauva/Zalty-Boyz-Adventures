import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("common");
  const tNav = await getTranslations("nav");

  return (
    <Container className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="font-heading text-3xl font-bold text-ink-900">404</h1>
      <p className="text-ink-700">{t("pageNotFound")}</p>
      <CTAButton href="/">{tNav("home")}</CTAButton>
    </Container>
  );
}
