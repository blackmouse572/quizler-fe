import LoginForm from "@/app/[locale]/(auth)/login/component/login-form";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import _ from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Link from "next/link";

type Props = {};

async function LoginPage({ }: Props) {
  const t = await getTranslations('SignIn')
  const m = await getMessages()

  return <div className="w-full h-full">
    <Link className={buttonVariants({ color: "primary", isIconOnly: false, variant: 'default', className: 'absolute font-heading font-medium top-10 left-10' })} href={"/"}>
      <Icons.SignatureArrow /> Go back </Link>
    <NextIntlClientProvider messages={_.pick(m, 'SignIn')}>
      <LoginForm />
    </NextIntlClientProvider>
  </div>;
}

export default LoginPage;
