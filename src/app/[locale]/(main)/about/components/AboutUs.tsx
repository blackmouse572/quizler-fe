import { useTranslations } from "next-intl"
import Image from "next/image"

export default function AboutUs() {
  const t = useTranslations("AboutUs")

  return (
    <div>
      <div className="flex justify-center text-3xl font-extrabold">
        {t("index")}
      </div>

      <div className="flex justify-center">
        <div className="flex max-w-screen-lg pt-20">
          <div className="mr-5 w-1/2">
            <div className="text-3xl font-extrabold">
              {t("who_we_are.index")}
            </div>
            <div className="pt-5">
              <div className="pt-5">{t("who_we_are.paragraph.para_1")}</div>
              <div className="pt-5">{t("who_we_are.paragraph.para_2")}</div>
            </div>
          </div>
          <div className="ml-5 w-1/2">
            <Image
              src={"/aboutus-1.jpg"}
              alt="aboutus-1"
              width={1000}
              height={200}
            ></Image>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-20">
        <div className="flex max-w-screen-lg pt-20">
          <div className="mr-5 w-1/2">
            <div className="text-3xl font-extrabold">
              {t("explain_offering_customer.index")}
            </div>
            <div className="pt-5">
              <div className="pt-5">
                {t("explain_offering_customer.paragraph.para_1")}
              </div>
              <div className="pt-5">
                {t("explain_offering_customer.paragraph.para_2")}
              </div>
            </div>
          </div>
          <div className="ml-5 flex w-1/2 justify-center">
            <Image
              src={"/aboutus-2.png"}
              alt="aboutus-2"
              width={300}
              height={100}
            ></Image>
          </div>
        </div>
      </div>
    </div>
  )
}
