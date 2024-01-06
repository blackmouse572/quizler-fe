import LoginForm from "@/app/[locale]/(auth)/login/component/login-form";
import GoBackButton from "@/components/go-back-btn";
import _ from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

type Props = {};

async function LoginPage({ }: Props) {
  const t = await getTranslations('SignIn')
  const m = await getMessages()

  return <div className="h-full w-full">
    <GoBackButton />
    <NextIntlClientProvider messages={_.pick(m, 'SignIn')}>
      <LoginForm />
    </NextIntlClientProvider>
  </div>;
}

export default LoginPage;
